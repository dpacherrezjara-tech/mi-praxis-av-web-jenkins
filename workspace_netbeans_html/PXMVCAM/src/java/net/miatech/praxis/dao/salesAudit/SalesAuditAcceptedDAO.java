package net.miatech.praxis.dao.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A1674Filter;
import net.miatech.beans.SaleAudit.A1675Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter_1;
import net.miatech.libmiatec.A1248;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SalesAuditAcceptedDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00989Filter> Search(SQP00989Filter filter) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String msjeError;
        String[] msjeError2 = new String[9];
        String msjeError3 = "";
        SQP00989Filter beanADM;
        List<SQP00989Filter> listaData = new ArrayList<SQP00989Filter>();
        List<SQP00989Filter> lstTotCurr = new ArrayList<SQP00989Filter>();

        session.getCNXIBMDB2().open();
        try {

            //  strSQL = "{CALL PXSAUDIT.SQP00990(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            strSQL = "{CALL PXSAUDIT.SQP00990(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);

            cs.registerOutParameter(22, Types.INTEGER);
            cs.registerOutParameter(23, Types.INTEGER);
            cs.registerOutParameter(24, Types.INTEGER);
            cs.registerOutParameter(25, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.OPCION);
            cs.setString(3, filter.DATEFROM);
            cs.setString(4, filter.DATETO);
            cs.setString(5, filter.A1672FUENT.trim());
            cs.setString(6, filter.A1672CANAL.trim());
            cs.setString(7, filter.A1672PAIVT);
            cs.setString(8, filter.A1672TDOC);
            cs.setString(9, filter.A1672TRNCU);
            cs.setString(10, filter.A1672AGENT);
            cs.setString(11, filter.A1672ITIN);
            cs.setString(12, filter.A1672FBASI);
            cs.setString(13, filter.REASONS);
            cs.setString(14, filter.strTicket.trim());

            cs.setString(15, filter.BOOKFROM);
            cs.setString(16, filter.BOOKTO);
            cs.setString(17, filter.LIKEFBASIS);
            cs.setString(18, filter.LIKEREASON);
            cs.setString(19, filter.ROUTE);
            cs.setDouble(20, filter.MONTO);
            cs.setString(21, filter.Agent);

            cs.setInt(22, filter.page.PAGNUM);
            cs.setInt(23, filter.page.PAGROW);
            cs.setInt(24, filter.page.TOTPAG);
            cs.setInt(25, filter.page.TOTROW);

            cs.execute();

            rst = cs.getResultSet();
            int pos = 0;

            filter.page.PAGNUM = cs.getInt(22);
            filter.page.PAGROW = cs.getInt(23);
            filter.page.TOTPAG = cs.getInt(24);
            filter.page.TOTROW = cs.getInt(25);
            while (rst.next()) {
                pos++;
                beanADM = new SQP00989Filter();
                beanADM.A1672CCUST = session.getUserView().getCustomerInfo().CCUST;
                beanADM.A1672AGENT = rst.getString("A1672AGENT").trim();
                beanADM.A1672PAIVT = rst.getString("A1672PAIVT").trim();
                beanADM.A1672FVENT = rst.getString("A1672FVENT").trim();
                beanADM.A1672FUENT = rst.getString("A1672FUENT").trim();
                beanADM.A1672CANAL = rst.getString("A1672CANAL").trim();
                beanADM.A1672NAMEF = rst.getString("AGENCY").trim();
                msjeError = rst.getString("A1580DESC2").trim();
                msjeError2 = msjeError.split(";");

                for (int i = 0; i < msjeError2.length; i++) {
                    msjeError3 += msjeError2[i] + "\n";
                }
                beanADM.A1580DESC2 = msjeError3;
                beanADM.strTicket = rst.getString("A1672CIA").trim() + " " + rst.getString("A1672FORMA").trim() + rst.getString("A1672SERIE").trim();
                beanADM.A1672CIA = rst.getString("A1672CIA").trim();
                beanADM.A1672FORMA = rst.getString("A1672FORMA").trim();
                beanADM.A1672SERIE = rst.getString("A1672SERIE").trim();
                beanADM.A1672CUPON = rst.getString("A1672CUPON");
                beanADM.A1672SEQ = rst.getString("A1672SEQ").trim();
                beanADM.A1672TRNCU = rst.getString("A1672TRNCU").trim();
                beanADM.A1672MONTT = rst.getString("A1672MNADM").trim();
                beanADM.A1672TTMIA = rst.getString("A1672TTMIA");
                beanADM.A1672TTAGT = rst.getString("A1672TTAGT");
                beanADM.A1672TTDIF = rst.getString("A1672TTDIF");
                beanADM.A1672BAGFT = rst.getString("A1672BAGFT");
                beanADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                beanADM.A1672FLADM = rst.getString("A1672FLADM").trim();
                beanADM.A1672ERROR = rst.getString("A1672ERROR").trim();
                beanADM.A1672FPROC = rst.getString("A1672FPROC").trim();
                beanADM.A1672TDOC = rst.getString("A1672TDOC").trim();
                beanADM.A1672FBASI = rst.getString("A1672FBASI").trim();
                beanADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                beanADM.A1672ITIN = rst.getString("A1672ITIN").trim();
                beanADM.A1672FREGI = rst.getString("A1672FREGI").trim();
                beanADM.A1672FREVI = rst.getString("A1672FREVI").trim();
                beanADM.A2657NREF = rst.getString("A1672RULNO").trim();
                beanADM.A1672FCMI = rst.getString("A1672FCMI").trim();
                beanADM.A1672PNR = rst.getString("A1672PNR").trim();
                beanADM.A1672IDFIL = rst.getString("A1672IDFIL").trim();
                beanADM.A1672CORREO = rst.getInt("A1672CORREO");

                //Paginación ===================================================
                beanADM.page.PAGNUM = filter.page.PAGNUM;
                beanADM.page.PAGROW = filter.page.PAGROW;
                beanADM.page.TOTPAG = filter.page.TOTPAG;
                beanADM.page.TOTROW = filter.page.TOTROW;

                listaData.add(beanADM);
                msjeError3 = "";
            }
            rst.close();
            //  }

            cs.close();

        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cs != null) {
                cs.close();
            }
            // =================
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return listaData;
    }

    public SQP00989Filter searchADMData(FACSIMILFilter filter, List<SQP00989Filter> lstSelectedTkts) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        SQP00989Filter recADM = new SQP00989Filter();
        List<SQP00989Filter> lstTickets = new ArrayList<SQP00989Filter>();
        SQP00989Filter ticket;
        String fuente = "";
        Double fare1 = 0.0;
        Double fare2 = 0.0;
        Double fare3 = 0.0;
        Double Queu1 = 0.0;
        Double Queu2 = 0.0;
        Double Queu3 = 0.0;
        Double Tax1 = 0.0;
        Double Tax2 = 0.0;
        Double Tax3 = 0.0;
        Double Com1 = 0.0;
        Double Com2 = 0.0;
        Double Com3 = 0.0;
        Double OCom1 = 0.0;
        Double OCom2 = 0.0;
        Double OCom3 = 0.0;
        Double Chrg1 = 0.0;
        Double Chrg2 = 0.0;
        Double Chrg3 = 0.0;
        Double Tot1 = 0.0;
        Double Tot2 = 0.0;
        Double Tot3 = 0.0;
        Double Tot4 = 0.0;

        session.getCNXIBMDB2().open();

        try {

            strSQL = "{CALL PXSAUDIT.SQP00993(?,?,?,?,?,?)}";

            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);

            if (filter.COUNTRY.equals("G")) {

                for (int i = 0; i < lstSelectedTkts.size(); i++) {
                    cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cs.setString(2, lstSelectedTkts.get(i).A1672CIA + lstSelectedTkts.get(i).A1672FORMA + lstSelectedTkts.get(i).A1672SERIE);
                    cs.setString(3, lstSelectedTkts.get(i).A1672CUPON);
                    cs.setString(4, lstSelectedTkts.get(i).A1672SEQ);
                    cs.setString(5, lstSelectedTkts.get(i).A1672TRNCU);
                    cs.setString(6, filter.AGTN.trim());
                    cs.execute();
                    /*    rst = cs.getResultSet();
                     if (rst.next()) {
      
                     }
                     rst.close();

                     if (cs.getMoreResults()) {*/
                    rst = cs.getResultSet();
                    if (rst.next()) {

                        fare1 += rst.getDouble("A1672FMORI");
                        fare2 += rst.getDouble("A1672FAORI");
                        fare3 += rst.getDouble("A1672FADIF");
                        Queu1 += rst.getDouble("A1672QMORI");
                        Queu2 += rst.getDouble("A1672QORIG");
                        Queu3 += rst.getDouble("A1672QDIF");
                        Tax1 += rst.getDouble("A1672TXMIA");
                        Tax2 += rst.getDouble("A1672TXAGT");
                        Tax3 += rst.getDouble("A1672TXDIF");
                        Com1 += rst.getDouble("A1672COMIA");
                        Com2 += rst.getDouble("A1672COAGT");
                        Com3 += rst.getDouble("A1672CODIF");

                        OCom1 += rst.getDouble("A1672OVMIA");
                        OCom2 += rst.getDouble("A1672OVAGT");
                        OCom3 += rst.getDouble("A1672OVDIF");

                        Chrg1 += rst.getDouble("A1672CHAMI");
                        Chrg2 += rst.getDouble("A1672CHAOR");
                        Chrg3 += rst.getDouble("A1672CHADI");

                        Tot1 += rst.getDouble("A1672COAGT");
                        Tot2 += rst.getDouble("A1672COAGT");
                        Tot3 += rst.getDouble("A1672TTDIF");
                        Tot3 += rst.getDouble("VALOR");
                    }
                    rst.close();
                    //  }   
                    /*if (cs.getMoreResults()) {
                     //Obteniendo el Detalle de las Razones
                     rst = cs.getResultSet();
                     String strReason = "";
                     int numReason = 0;
                     while (rst.next()) {
                     numReason++;
                     strReason += rst.getString("A2560CODRZ") + '-' + rst.getString("REASON") + "\n";
                     }
                     recADM.REASONS = strReason;
                     rst.close();
                     }*/
                }

                recADM.A1672FMORI = fare1.toString();
                recADM.A1672FAORI = fare2.toString();
                recADM.A1672FADIF = fare3.toString();

                recADM.A1672QMORI = Queu1.toString();
                recADM.A1672QORIG = Queu2.toString();
                recADM.A1672QDIF = Queu3.toString();

                recADM.A1672TXMIA = Tax1.toString();
                recADM.A1672TXAGT = Tax2.toString();
                recADM.A1672TXDIF = Tax3.toString();

                recADM.A1672COMIA = Com1.toString();
                recADM.A1672COAGT = Com2.toString();
                recADM.A1672CODIF = Com3.toString();

                recADM.A1672OVMIA = OCom1.toString();
                recADM.A1672OVAGT = OCom2.toString();
                recADM.A1672OVDIF = OCom3.toString();

                recADM.A1672CHAMI = Chrg1.toString();
                recADM.A1672CHAOR = Chrg2.toString();
                recADM.A1672CHADI = Chrg3.toString();

                recADM.A1672TTMIA = Tot1.toString();
                recADM.A1672TTAGT = Tot2.toString();
                recADM.A1672TTDIF = Tot3.toString();
                recADM.A1672CAMBIODIFE = Tot3;
            }

            if (filter.COUNTRY.equals("S")) {
                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, filter.TDNR.trim());
                cs.setString(3, lstSelectedTkts.get(0).A1672CUPON);
                cs.setString(4, lstSelectedTkts.get(0).A1672SEQ);
                cs.setString(5, lstSelectedTkts.get(0).A1672TRNCU);
                cs.setString(6, filter.AGTN.trim());
                cs.execute();

                /* rst = cs.getResultSet();

                 if (rst.next()) {
                 recADM.codAgente = rst.getString("A003KEY").trim();
                 recADM.strNombre = rst.getString("A003KEY1").trim();
                 recADM.strDirecAgte = rst.getString("A003DIREC1").trim() + rst.getString("A003DIREC2").trim();
                 recADM.strTelefono = rst.getString("A003TELEF1").trim();
                 recADM.strFax = rst.getString("A003FAX").trim();
                 recADM.strEmail = rst.getString("A003MAIL").trim();
                 recADM.strCodPostal = rst.getString("A003ZIPCOD").trim();
                 recADM.strCiudad = rst.getString("A003CIUDAD").trim();
                 recADM.strPais = rst.getString("A003PSALF").trim();
                 recADM.strUbicacion = rst.getString("A003DISTRI").trim() + ", " + rst.getString("A003PROVIN").trim() + ", " + rst.getString("A003DEPART").trim();
                 }
                 rst.close();

                 if (cs.getMoreResults()) {*/
                rst = cs.getResultSet();
                if (rst.next()) {

                    recADM.A1672CIA = rst.getString("A1672CIA").trim();
                    recADM.A1672FORMA = rst.getString("A1672FORMA").trim();
                    recADM.A1672SERIE = rst.getString("A1672SERIE").trim();
                    recADM.strTicket = recADM.A1672CIA + " " + recADM.A1672FORMA + recADM.A1672SERIE;
                    recADM.A1672FVENT = rst.getString("A1672FVENT").trim();
                    recADM.A1672FUENT = rst.getString("A1672FUENT").trim();
                    recADM.A1672CTYVT = rst.getString("A1672CTYVT").trim();
                    recADM.A1672PAIVT = rst.getString("A1672PAIVT").trim();
                    recADM.A1672AGENT = rst.getString("A1672AGENT").trim();
                    recADM.A1672FPROC = rst.getString("A1672FPROC").trim();
                    recADM.A1672STAT = rst.getString("A1672STAT").trim();
                    recADM.A1672MONTT = rst.getString("A1672MONTT").trim();
                    recADM.A1672FLADM = rst.getString("A1672FLADM").trim();
                    recADM.A1672CUPON = rst.getString("A1672CUPON");
                    recADM.A1672SEQ = rst.getString("A1672SEQ").trim();
                    recADM.A1672TRNCU = rst.getString("A1672TRNCU").trim();

                    recADM.A1672FMORI = rst.getString("A1672FMORI");
                    recADM.A1672FAORI = rst.getString("A1672FAORI");
                    recADM.A1672FADIF = rst.getString("A1672FADIF");

                    recADM.A1672QMORI = rst.getString("A1672QMORI");
                    recADM.A1672QORIG = rst.getString("A1672QORIG");
                    recADM.A1672QDIF = rst.getString("A1672QDIF");

                    recADM.A1672TXMIA = rst.getString("A1672TXMIA");
                    recADM.A1672TXAGT = rst.getString("A1672TXAGT");
                    recADM.A1672TXDIF = rst.getString("A1672TXDIF");

                    recADM.A1672COMIA = rst.getString("A1672COMIA");
                    recADM.A1672COAGT = rst.getString("A1672COAGT");
                    recADM.A1672CODIF = rst.getString("A1672CODIF");

                    recADM.A1672OVMIA = rst.getString("A1672OVMIA");
                    recADM.A1672OVAGT = rst.getString("A1672OVAGT");
                    recADM.A1672OVDIF = rst.getString("A1672OVDIF");

                    recADM.A1672CHAMI = rst.getString("A1672CHAMI");
                    recADM.A1672CHAOR = rst.getString("A1672CHAOR");
                    recADM.A1672CHADI = rst.getString("A1672CHADI");

                    recADM.A1672TTMIA = rst.getString("A1672COAGT");
                    recADM.A1672TTAGT = rst.getString("A1672COAGT");
                    recADM.A1672TTDIF = rst.getString("A1672TTDIF");
                    recADM.A1672ERROR = rst.getString("A1672ERROR");
                    recADM.A1672CAMBIODIFE = rst.getDouble("VALOR");

                }
                rst.close();

            }

            if (cs.getMoreResults()) {
                //Obteniendo el Detalle de las Razones
                rst = cs.getResultSet();
                String strReason = "";
                int numReason = 0;
                while (rst.next()) {
                    numReason++;
                    strReason += rst.getString("A2560CODRZ") + '-' + rst.getString("REASON") + "\n";
                }
                recADM.REASONS = strReason;
                rst.close();
            }

            cs.close();
            //}
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cs != null) {
                cs.close();
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().close();
        }

        return recADM;
    }

    public List<A1248> loadFieldsConditions() throws Exception {

        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;
        Connection cnx = null;
        try {
            sql = "SELECT A006PAIS FROM PRAXIS.A006 "
                    + "WHERE LENGTH(TRIM(A006PAIS)) = 2  ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A1248();
                // record.TABNAME = rst.getString("TABNAME").trim();
                record.USERFIELD = rst.getString("A006PAIS").trim();
                /* record.DESCRIPT = rst.getString("DESCRIPT").trim();
                 record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
                 record.DATATYPE = rst.getString("DATATYPE").trim();
                 record.SUBSTRFL = rst.getString("SUBSTRFL").trim();*/
                lista.add(record);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lista;

    }

    public List<A1248> loadFields() throws Exception {

        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;
        Connection cnx = null;
        try {

            sql = "SELECT A3044CODRZ || '-' || A3044COMEN AS A3044COMEN FROM PXSAUDIT.A3044 ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A1248();
                record.DESCRIPT = rst.getString("A3044COMEN").trim();

                lista.add(record);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lista;

    }

    public List<A1248> loadFields2() throws Exception {

        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;
        Connection cnx = null;
        try {

            sql = "SELECT DISTINCT A2560CODRZ FROM PXSAUDIT.A2560 ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A1248();
                record.DESCRIPT = rst.getString("A2560CODRZ").trim();

                lista.add(record);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lista;

    }

    public List<SQP00989Filter> search_Pattern(SQP00989Filter filter) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String msjeError;
        String[] msjeError2 = new String[9];
        String msjeError3 = "";
        SQP00989Filter beanADM;
        List<SQP00989Filter> listaData = new ArrayList<SQP00989Filter>();
        List<SQP00989Filter> lstTotCurr = new ArrayList<SQP00989Filter>();

        session.getCNXIBMDB2().open();
        try {

            //  strSQL = "{CALL PXSAUDIT.SQP00990(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            strSQL = "{CALL PXSAUDIT.SQP02282(?,?,?,?,?,?,?,?)}";

            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DATEFROM);
            cs.setString(3, filter.DATETO);
            cs.setString(4, filter.strTicket.trim());

            cs.setInt(5, filter.page.PAGNUM);
            cs.setInt(6, filter.page.PAGROW);
            cs.setInt(7, filter.page.TOTPAG);
            cs.setInt(8, filter.page.TOTROW);

            cs.execute();

            rst = cs.getResultSet();
            int pos = 0;

            filter.page.PAGNUM = cs.getInt(5);
            filter.page.PAGROW = cs.getInt(6);
            filter.page.TOTPAG = cs.getInt(7);
            filter.page.TOTROW = cs.getInt(8);
            while (rst.next()) {
                pos++;
                beanADM = new SQP00989Filter();
                beanADM.A1672CCUST = session.getUserView().getCustomerInfo().CCUST;
                beanADM.A1672AGENT = rst.getString("A1672AGENT").trim();
                beanADM.A1672PAIVT = rst.getString("A1672PAIVT").trim();
                beanADM.A1672FVENT = rst.getString("A1672FVENT").trim();
                beanADM.A1672FUENT = rst.getString("A1672FUENT").trim();
                beanADM.A1672CANAL = rst.getString("A1672CANAL").trim();
                beanADM.A1672NAMEF = rst.getString("AGENCY").trim();
                msjeError = rst.getString("A1580DESC2").trim();
                msjeError2 = msjeError.split(";");

                for (int i = 0; i < msjeError2.length; i++) {
                    msjeError3 += msjeError2[i] + "\n";
                }
                beanADM.A1580DESC2 = msjeError3;
                beanADM.strTicket = rst.getString("A1672CIA").trim() + " " + rst.getString("A1672FORMA").trim() + rst.getString("A1672SERIE").trim();
                beanADM.A1672CIA = rst.getString("A1672CIA").trim();
                beanADM.A1672FORMA = rst.getString("A1672FORMA").trim();
                beanADM.A1672SERIE = rst.getString("A1672SERIE").trim();
                beanADM.A1672CUPON = rst.getString("A1672CUPON");
                beanADM.A1672SEQ = rst.getString("A1672SEQ").trim();
                beanADM.A1672TRNCU = rst.getString("A1672TRNCU").trim();
                beanADM.A1672MONTT = rst.getString("A1672MNADM").trim();
                beanADM.A1672TTMIA = rst.getString("A1672TTMIA");
                beanADM.A1672TTAGT = rst.getString("A1672TTAGT");
                beanADM.A1672TTDIF = rst.getString("A1672TTDIF");
                beanADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                beanADM.A1672FLADM = rst.getString("A1672FLADM").trim();
                beanADM.A1672ERROR = rst.getString("A1672ERROR").trim();
                beanADM.A1672FPROC = rst.getString("A1672FPROC").trim();
                beanADM.A1672TDOC = rst.getString("A1672TDOC").trim();
                beanADM.A1672FBASI = rst.getString("A1672FBASI").trim();
                beanADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                beanADM.A1672ITIN = rst.getString("A1672ITIN").trim();
                beanADM.A1672FREGI = rst.getString("A1672FREGI").trim();
                beanADM.A1672FREVI = rst.getString("A1672FREVI").trim();
                beanADM.A2657NREF = rst.getString("A1672RULNO").trim();

                //Paginación ===================================================
                beanADM.page.PAGNUM = filter.page.PAGNUM;
                beanADM.page.PAGROW = filter.page.PAGROW;
                beanADM.page.TOTPAG = filter.page.TOTPAG;
                beanADM.page.TOTROW = filter.page.TOTROW;

                listaData.add(beanADM);
                msjeError3 = "";
            }
            rst.close();
            //  }

            cs.close();

        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cs != null) {
                cs.close();
            }
            // =================
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return listaData;
    }

    public List<A1580Filter> lstComponent(A1672Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01012(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1580Filter();

                objRtn.A1580CORRL = rs01.getString("A1580CORRL");
                objRtn.A1580FROM = rs01.getString("A1580FROM") + '-' + rs01.getString("A1580TO");
                objRtn.A1580TO = rs01.getString("A1580TO");
                objRtn.A1580CARR = rs01.getString("A1580CARR");
                objRtn.A1580CLASE = rs01.getString("A1580CLASE");
                objRtn.A1580NVLO = rs01.getString("A1580NVLO");
                objRtn.A1580FVLO = rs01.getString("A1580FVLO");
                objRtn.A1580HVLO = rs01.getString("A1580HVLO");
                objRtn.A1580FBASI = rs01.getString("A1580FBASI");
                objRtn.A1580FARE = rs01.getDouble("A1580FARE");
                objRtn.A1580MDA = rs01.getString("A1580MDA");
                objRtn.A1580MORIG = rs01.getString("A1580MORIG");
                objRtn.A1580FAORI = rs01.getDouble("A1580FAORI");
                objRtn.A1580QORIG = rs01.getDouble("A1580QORIG");
                objRtn.A1580NUC = rs01.getDouble("A1580NUC");
                objRtn.A1580ROE = rs01.getDouble("A1580ROE");

                objRtn.A1580STAT = rs01.getString("A1580STAT");
                objRtn.A1580SBSTA = rs01.getString("A1580SBSTA");
                objRtn.A1580ERROR = rs01.getString("A1580ERROR");
                objRtn.A1580MMORI = rs01.getString("A1580MMORI");
                objRtn.A1580FMIOR = rs01.getDouble("A1580FMIOR");
                objRtn.A1580QMIOR = rs01.getDouble("A1580QMIOR");
                objRtn.A1580FADIF = rs01.getDouble("A1580FADIF");
                objRtn.A1580QDIF = rs01.getDouble("A1580QDIF");

                objRtn.A1580CCUST = rs01.getString("A1580CCUST");
                objRtn.A1580CIA = rs01.getString("A1580CIA");
                objRtn.A1580FORMA = rs01.getString("A1580FORMA");
                objRtn.A1580SERIE = rs01.getString("A1580SERIE");
                objRtn.A1580SEQ = rs01.getString("A1580SEQ");
                objRtn.A1580CUPON = rs01.getString("A1580CUPON");
                objRtn.A1580TRNCU = rs01.getString("A1580TRNCU");
                objRtn.A1580FLADM = rs01.getString("A1580FLADM");

                objRtn.A1580Q = rs01.getDouble("A1580Q");
                objRtn.A1580MDAAT = rs01.getString("A1580MDAAT");
                objRtn.A1580ROEAT = rs01.getDouble("A1580ROEAT");
                objRtn.A1580FARAT = rs01.getDouble("A1580FARAT");
                objRtn.A1580QATPC = rs01.getDouble("A1580QATPC");
                objRtn.A1580SOATP = rs01.getDouble("A1580SOATP");
                objRtn.A1580YQATP = rs01.getDouble("A1580YQATP");
                objRtn.A1580YRATP = rs01.getDouble("A1580YRATP");
                objRtn.A1580SOMIO = rs01.getDouble("A1580SOMIO");
                objRtn.A1580YQMIO = rs01.getDouble("A1580YQMIO");
                objRtn.A1580YRMIO = rs01.getDouble("A1580YRMIO");
                objRtn.A1580YQORI = rs01.getDouble("A1580YQORI");
                objRtn.A1580YRORI = rs01.getDouble("A1580YRORI");
                objRtn.A1580YQDIF = rs01.getDouble("A1580YQDIF");
                objRtn.A1580YRDIF = rs01.getDouble("A1580YRDIF");

                objRtn.A1580FEEAT = rs01.getString("A1580FEEAT");
                objRtn.A1580SOVER = rs01.getString("A1580SOVER");
                objRtn.A1580SOORI = rs01.getString("A1580SOORI");
                objRtn.A1580APPLY = rs01.getString("A1580APPLY");
                objRtn.A1580MDAPN = rs01.getString("A1580MDAPN");
                objRtn.A1580PENAL = rs01.getString("A1580PENAL");
                objRtn.A1580INCCP = rs01.getString("A1580INCCP");
                objRtn.A1580EXCLU = rs01.getString("A1580EXCLU");
                objRtn.A1580TOX = rs01.getString("A1580TOX");
                objRtn.A1580FROMX = rs01.getString("A1580FROMX");

                lstRtn.add(objRtn);

                System.out.println("termino lista COMPONENTE");
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

    public List<A1580Filter> lstComponentUsed(A1672Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01501(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1580Filter();

                objRtn.A1580CORRL = rs01.getString("A2908CORRL");
                objRtn.A1580FROM = rs01.getString("A2908FROM") + '-' + rs01.getString("A2908TO");
                objRtn.A1580CARR = rs01.getString("A2908CARR");
                objRtn.A1580CLASE = rs01.getString("A2908CLASE");
                objRtn.A1580FBASI = rs01.getString("A2908FBASI");
                objRtn.A1580FARE = rs01.getDouble("A2908FARE");
                objRtn.A1580MDAAT = rs01.getString("A2908MDAAT");
                objRtn.A1580NUC = rs01.getDouble("A2908NUC");
                objRtn.A1580ROEAT = rs01.getDouble("A2908ROEAT");

                objRtn.A1580STAT = rs01.getString("A2908STAT");
                objRtn.A1580ERROR = rs01.getString("A2908ERROR");
                objRtn.A1580MMORI = rs01.getString("A2908MMORI");
                objRtn.A1580FMIOR = rs01.getDouble("A2908FMIOR");
                objRtn.A1580QMIOR = rs01.getDouble("A2908QMIOR");

                objRtn.A1580FLADM = rs01.getString("A2908FLADM");

                objRtn.A1580Q = rs01.getDouble("A2908Q");
                objRtn.A1580SOMIO = rs01.getDouble("A2908SOMIO");

                objRtn.A1580FEEAT = rs01.getString("A2908FEEAT");
                objRtn.A1580SOVER = rs01.getString("A2908SOVER");
                objRtn.A1580APPLY = rs01.getString("A2908APPLY");
                objRtn.A1580PENAL = rs01.getString("A2908PENAL");
                objRtn.A1580INCCP = rs01.getString("A2908INCCP");
                objRtn.A1580EXCLU = rs01.getString("A2908EXCLU");

                lstRtn.add(objRtn);

                System.out.println("termino lista COMPONENTE");
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

    public List<A1580Filter> lstComponentOld(A1672Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter recADM2 = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01431(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                recADM2 = new A1580Filter();

                recADM2.A1580APPLY = rs01.getString("A2837APPLY");
                recADM2.A1580CIA = rs01.getString("A2837CIA");
                recADM2.A1580FORMA = rs01.getString("A2837FORMA");
                recADM2.A1580SERIE = rs01.getString("A2837SERIE");
                recADM2.A1580SEQ = rs01.getString("A2837SEQ");
                recADM2.A1580CUPON = rs01.getString("A2837CUPON");
                recADM2.A1580TRNCU = rs01.getString("A2837TRNCU");
                recADM2.A1580CORRL = rs01.getString("A2837CORRL");
                recADM2.A2837CIANW = rs01.getString("A2837CIANW") + rs01.getString("A2837FORNW") + rs01.getString("A2837SERNW");
                recADM2.A2837FORNW = rs01.getString("A2837FORNW");
                recADM2.A2837SERNW = rs01.getString("A2837SERNW");
                recADM2.A2837CCORR = rs01.getString("A2837CCORR");
                recADM2.A2837CONEX = rs01.getString("A2837CONEX");
                recADM2.A1580FROM = rs01.getString("A2837FROM") + rs01.getString("A2837TO");
                recADM2.A1580TO = rs01.getString("A2837TO");
                recADM2.A2837CIAPA = rs01.getString("A2837CIAPA") + rs01.getString("A2837FORPA") + rs01.getString("A2837SERPA");
                recADM2.A2837FORPA = rs01.getString("A2837FORPA");
                recADM2.A2837SERPA = rs01.getString("A2837SERPA");
                recADM2.A1580CARR = rs01.getString("A2837CARR");
                recADM2.A1580CLASE = rs01.getString("A2837CLASE");
                recADM2.A1580FBASI = rs01.getString("A2837FBASI");
                recADM2.A1580MDAAT = rs01.getString("A2837MDAAT");
                recADM2.A1580ROEAT = rs01.getDouble("A2837ROEAT");
                recADM2.A1580FEEAT = rs01.getString("A2837FEEAT");
                recADM2.A1580MMORI = rs01.getString("A2837MMORI");
                recADM2.A1580FMIOR = rs01.getDouble("A2837FMIOR");
                recADM2.A1580QMIOR = rs01.getDouble("A2837QMIOR");
                recADM2.A2837FEEMI = rs01.getString("A2837FEEMI");
                recADM2.A1580MDA = rs01.getString("A2837MDA");
                recADM2.A1580FARE = rs01.getDouble("A2837FARE");
                recADM2.A1580Q = rs01.getDouble("A2837Q");
                recADM2.A2837BSR = rs01.getDouble("A2837BSR");
                recADM2.A1580MORIG = rs01.getString("A2837MORIG");
                recADM2.A1580FAORI = rs01.getDouble("A2837FAORI");
                recADM2.A1580QORIG = rs01.getDouble("A2837QORIG");
                recADM2.A1580YQORI = rs01.getDouble("A2837YQORI");
                recADM2.A1580YRORI = rs01.getDouble("A2837YRORI");
                recADM2.A1580STAT = rs01.getString("A2837STAT");
                recADM2.A1580ERROR = rs01.getString("A2837ERROR");
                recADM2.A1580FROMX = rs01.getString("A2837FROMX");
                recADM2.A1580TOX = rs01.getString("A2837TOX");
                recADM2.A2837FLAGO = rs01.getString("A2837FLAGO");
                recADM2.A2837TRNCO = rs01.getString("A2837TRNCO");
                recADM2.A2837FEMIO = rs01.getString("A2837FEMIO");
                recADM2.A2837IATAO = rs01.getString("A2837IATAO");

                lstRtn.add(recADM2);
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

    public List<A1673Filter> lstTax(A1672Filter filter) throws SQLException, Exception {
        List<A1673Filter> lstRtn = new ArrayList<A1673Filter>(0);
        A1673Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01013(?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1673Filter();

                objRtn.A1673CORRL = rs01.getString("A1673CORRL");
                objRtn.A1673CDTAX = rs01.getString("A1673CDTAX");
                objRtn.A1673CDATO = rs01.getString("A1673CDATO");
                objRtn.A1673MORIG = rs01.getString("A1673MORIG");
                objRtn.A1673TXORI = rs01.getDouble("A1673TXORI");

                objRtn.A1673STAT = rs01.getString("A1673STAT");
                objRtn.A1673TXDIF = rs01.getDouble("A1673TXDIF");
                objRtn.A1673TXDAF = rs01.getDouble("A1673TXDAF");
                objRtn.A1673TXVTA = rs01.getDouble("A1673TXVTA");
                objRtn.A1673TXUSE = rs01.getDouble("A1673TXUSE");

                objRtn.A1673SBSTA = rs01.getString("A1673SBSTA");
                objRtn.A1673ERROR = rs01.getString("A1673ERROR");
                objRtn.A1673MONED = rs01.getString("A1673MONED");
                objRtn.A1673TXMIA = rs01.getDouble("A1673TXMIA");

                lstRtn.add(objRtn);

                System.out.println("termino lista TAX");
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

    public SQP00989Filter searchADMData(A1672Filter filter) throws SQLException, Exception {

        SQP00989Filter recADM = new SQP00989Filter();

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00993(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA + filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_CUPON.trim());
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_TRNCU);
            cstmt01.setString(6, filter.A1672AGENT);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {

                recADM = new SQP00989Filter();
                recADM.A1672CIA = rst.getString("A1672CIA").trim();
                recADM.A1672FORMA = rst.getString("A1672FORMA").trim();
                recADM.A1672SERIE = rst.getString("A1672SERIE").trim();
                recADM.strTicket = recADM.A1672CIA + " " + recADM.A1672FORMA + recADM.A1672SERIE;
                recADM.A1672FVENT = rst.getString("A1672FVENT").trim();
                recADM.A1672FUENT = rst.getString("A1672FUENT").trim();
                recADM.A1672CANAL = rst.getString("A1672CANAL").trim();
                recADM.A1672CTYVT = rst.getString("A1672CTYVT").trim();
                recADM.A1672PAIVT = rst.getString("A1672PAIVT").trim();
                recADM.A1672AGENT = rst.getString("A1672AGENT").trim();
                recADM.A1672FPROC = rst.getString("A1672FPROC").trim();
                recADM.A1672STAT = rst.getString("A1672STAT").trim();
                recADM.A1672MONTT = rst.getString("A1672MONTT").trim();
                recADM.A1672FLADM = rst.getString("A1672FLADM").trim();
                recADM.A1672CUPON = rst.getString("A1672CUPON").trim();
                recADM.A1672SEQ = rst.getString("A1672SEQ").trim();
                recADM.A1672TRNCU = rst.getString("A1672TRNCU").trim();
                recADM.A1672CURRENCY = rst.getString("A1672CURRENCY");

                recADM.A1672UASIG = rst.getString("A1672UASIG").trim();
                recADM.A1672FASIG = rst.getString("A1672FASIG").trim();
                recADM.A1672REVIS = rst.getString("A1672REVIS").trim();
                recADM.A1672FREVI = rst.getString("A1672FREVI").trim();
                recADM.A1672CTYEM = rst.getString("A1672CTYEM").trim();
                recADM.A1672TPAX = rst.getString("A1672TPAX").trim();
                recADM.A1672TARTK = rst.getString("A1672TARTK").trim();
                recADM.A1672EQVTK = rst.getString("A1672EQVTK").trim();
                recADM.A1672MONET = rst.getString("A1672MONET").trim();
                recADM.A1672ADC = rst.getString("A1672ADC").trim();
                recADM.A1672NUC = rst.getString("A1672NUC").trim();
                recADM.A1672ROE = rst.getString("A1672ROE").trim();
                recADM.A1672PLUS = rst.getString("A1672PLUS").trim();
                recADM.A1672SOVER = rst.getString("A1672SOVER").trim();
                recADM.A1672TCAMB = rst.getString("A1672TCAMB").trim();
                recADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                recADM.A1672TDOC = rst.getString("A1672TDOC").trim();
                recADM.A1672GRUPO = rst.getString("A1672GRUPO").trim();
                recADM.A1672FCMI = rst.getString("A1672FCMI").trim();
                recADM.A1672TIPOF = rst.getString("A1672TIPOF").trim();
                recADM.A1672PAIEM = rst.getString("A1672PAIEM").trim();
                recADM.A1672COMEN = rst.getString("A1672COMEN").trim();
                recADM.A1672MODI = rst.getString("A1672MODI").trim();
                recADM.A1672ARPI = rst.getString("A1672ARPI").trim();
                recADM.A1672FCPI = rst.getString("A1672FCPI").trim();
                recADM.A1672SASI = rst.getString("A1672SASI").trim();
                recADM.A1672TRNCO = rst.getString("A1672TRNCO").trim();
                recADM.A1672IATAV = rst.getString("A1672IATAV").trim();
                recADM.A1672FECSL = rst.getString("A1672FECSL").trim();
                recADM.A1672FUENV = rst.getString("A1672FUENV").trim();
                recADM.A1672TRF = rst.getString("A1672TRF").trim();
                recADM.A1672ERROR = rst.getString("ERROR");
                recADM.A1672CMBPO = rst.getString("A1672CMBPO");

                recADM.A1672FMORI = rst.getString("A1672FMORI");
                recADM.A1672FAORI = rst.getString("A1672FAORI");
                recADM.A1672FADIF = rst.getString("A1672FADIF");

                recADM.A1672QMORI = rst.getString("A1672QMORI");
                recADM.A1672QORIG = rst.getString("A1672QORIG");
                recADM.A1672QDIF = rst.getString("A1672QDIF");

                recADM.A1672TXMIA = rst.getString("A1672TXMIA");
                recADM.A1672TXAGT = rst.getString("A1672TXAGT");
                recADM.A1672TXDIF = rst.getString("A1672TXDIF");

                recADM.A1672COMIA = rst.getString("A1672COMIA");
                recADM.A1672COAGT = rst.getString("A1672COAGT");
                recADM.A1672CODIF = rst.getString("A1672CODIF");

                recADM.A1672SCDIF = rst.getString("A1672SCDIF");
                recADM.A1672SCMIA = rst.getString("A1672SCMIA");
                recADM.A1672SCAGT = rst.getString("A1672SCAGT");

                recADM.A1672OVMIA = rst.getString("A1672OVMIA");
                recADM.A1672OVAGT = rst.getString("A1672OVAGT");
                recADM.A1672OVDIF = rst.getString("A1672OVDIF");

                recADM.A1672CHAMI = rst.getString("A1672CHAMI");
                recADM.A1672CHAOR = rst.getString("A1672CHAOR");
                recADM.A1672CHADI = rst.getString("A1672CHADI");

                recADM.A1672TTMIA = rst.getString("A1672TTMIA");
                recADM.A1672TTAGT = rst.getString("A1672TTAGT");
                recADM.A1672TTDIF = rst.getString("A1672TTDIF");
                //ZPP
                recADM.A1672CONXV = rst.getString("A1672CONXV");
                recADM.A1672ITIN = rst.getString("A1672ITIN");
                recADM.A1672CARR = rst.getString("A1672CARR");
                recADM.A1672NVLO = rst.getString("A1672NVLO");
                recADM.A1672FVLO = rst.getString("A1672FVLO");
                recADM.A1672CLASE = rst.getString("A1672CLASE");
                recADM.A1672CABIN = rst.getString("A1672CABIN");
                recADM.A1672FBASI = rst.getString("A1672FBASI");
                recADM.A1672MOTAI = rst.getString("A1672MOTAI");
                recADM.A1672MOEAI = rst.getString("A1672MOEAI");
                recADM.A1672DI = rst.getString("A1672DI");
                recADM.A1672FEMIO = rst.getString("A1672FEMIO");
                recADM.A1672IATAO = rst.getString("A1672IATAO");
                recADM.A1672CEMIO = rst.getString("A1672CEMIO");
                recADM.A1672CIAOR = rst.getString("A1672CIAOR");
                recADM.A1672FOROR = rst.getString("A1672FOROR");
                recADM.A1672SEROR = rst.getString("A1672SEROR");
                recADM.A1672QTYTK = rst.getString("A1672QTYTK");
                recADM.A1672DIVTA = rst.getString("A1672DIVTA");
                recADM.A1672FAREM = rst.getString("A1672FAREM");
                recADM.A1672EQVM = rst.getString("A1672EQVM");
                recADM.A1672CPNS = rst.getString("A1672CPNS");
                recADM.A1672MDAAD = rst.getString("A1672MDAAD");
                recADM.A1672FLAGP = rst.getString("A1672FLAGP");
                recADM.A1672FRESV = rst.getString("A1672FRESV");
                recADM.A1672MOTAU = rst.getString("A1672MOTAU");
                recADM.A1672MOEAU = rst.getString("A1672MOEAU");
                recADM.A1672RFIS = rst.getString("A1672RFIS");
                recADM.A1672RFICM = rst.getString("A1672RFICM");
                recADM.A1672CODWA = rst.getString("A1672CODWA");
                recADM.A1672CNX1 = rst.getString("A1672CNX1");
                recADM.A1672CNX2 = rst.getString("A1672CNX2");
                recADM.A1672CNX3 = rst.getString("A1672CNX3");
                recADM.A1672CNX4 = rst.getString("A1672CNX4");
                recADM.A1672QOVER = rst.getDouble("A1672QOVER");
                recADM.A1672YQORI = rst.getDouble("A1672YQORI");
                recADM.A1672PSCAG = rst.getString("A1672PSCAG");
                recADM.A1672TARAI = rst.getDouble("A1672TARAI");
                recADM.A1672EQVAI = rst.getDouble("A1672EQVAI");
                recADM.A1672YQPGM = rst.getDouble("A1672YQPGM");
                recADM.A1672YRPGM = rst.getDouble("A1672YRPGM");
                recADM.A1672PNTMI = rst.getDouble("A1672PNTMI");
                recADM.A1672FAREN = rst.getDouble("A1672FAREN");
                recADM.A1672EQVN = rst.getDouble("A1672EQVN");
                recADM.A1672BSR = rst.getDouble("A1672BSR");
                recADM.A1672TARAU = rst.getDouble("A1672TARAU");
                recADM.A1672EQVAU = rst.getDouble("A1672EQVAU");
                recADM.A1672SOVAI = rst.getDouble("A1672SOVAI");
                recADM.A1672ADCAI = rst.getDouble("A1672ADCAI");
                recADM.A1672FAOLD = rst.getDouble("A1672FAOLD");
                recADM.A1672PNTIV = rst.getDouble("A1672PNTIV");
                recADM.A1672RUTAF = rst.getString("A1672RUTAF");
                recADM.A1672NAMEF = rst.getString("A1672NAMEF");
                recADM.A1672TKCNX = rst.getString("A1672CNX1");

            }
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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
        return recADM;
    }

    public List<A1672Filter> lstItinerary(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01153(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA + filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_SEQ);
            cstmt01.setString(4, filter.VP_CUPON);
            cstmt01.setString(5, filter.VP_TRNCU.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1672Filter();

                objRtn.VP_FRMSRIE = filter.VP_CIA + filter.VP_FRMSRIE;
                objRtn.A1672CUPON = rs01.getString("CUPON");
                objRtn.ORIGEN = rs01.getString("ORIGEN");
                objRtn.DESTINO = rs01.getString("DESTINO");
                objRtn.A1672CARR = rs01.getString("CARRIER");
                objRtn.A1672NVLO = rs01.getString("NVLO");
                objRtn.A1672FVLO = rs01.getString("FVLO");
                objRtn.A1672CLASE = rs01.getString("CLASE");
                objRtn.A1672FBASI = rs01.getString("FBASIS");
                objRtn.A1672CONEX = rs01.getString("CONEXION");
                objRtn.A1672CABIN = rs01.getString("CABINA");
                objRtn.A1672CPNS = rs01.getString("CUPONES");

                lstRtn.add(objRtn);

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

    public List<A1673Filter> searchLstTax(A1672Filter filter) throws SQLException, Exception {
        List<A1673Filter> lstRtn = new ArrayList<A1673Filter>(0);
        A1673Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01662(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1673Filter();

                objRtn.A1673CORRL = rs01.getString("A1673CORRL");
                objRtn.A1673CDTAX = rs01.getString("A1673CDTAX");
                objRtn.A1673CDATO = rs01.getString("A1673CDATO");
                objRtn.A1673MORIG = rs01.getString("A1673MORIG");
                objRtn.A1673TXORI = rs01.getDouble("A1673TXORI");

                objRtn.A1673STAT = rs01.getString("A1673STAT");
                if (filter.VP_TRNCU.equals("EXCH")) {
                    objRtn.A1673TXDIF = rs01.getDouble("A1673TXDIF");
                    objRtn.A1673RATE = 0.00;
                } else {
                    if (rs01.getDouble("A1673TXDIF") >= 0) {
                        objRtn.A1673TXDIF = rs01.getDouble("A1673TXDIF");
                        objRtn.A1673RATE = 0.00;
                    } else {
                        objRtn.A1673TXDIF = 0.00;
                        objRtn.A1673RATE = rs01.getDouble("A1673TXDIF");
                    }
                }

                objRtn.A1673TXDAF = rs01.getDouble("A1673TXDAF");
                objRtn.A1673TXVTA = rs01.getDouble("A1673TXVTA");
                objRtn.A1673TXUSE = rs01.getDouble("A1673TXUSE");
                objRtn.A1673OLDAI = rs01.getDouble("A1673OLDAI");
                objRtn.A1673OLDAG = rs01.getDouble("A1673OLDAG");

                objRtn.A1673SBSTA = rs01.getString("A1673SBSTA");
                objRtn.A1673ERROR = rs01.getString("A1673ERROR");
                objRtn.A1673MONED = rs01.getString("A1673MONED");
                objRtn.A1673TXMIA = rs01.getDouble("A1673TXMIA");
                objRtn.A1673PAIS = rs01.getString("A1741PAIS");
                objRtn.A1673HREGI = rs01.getString("A1741CONCE");

                lstRtn.add(objRtn);
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

        return lstRtn;

    }

    public List<A1674Filter> searchLstCommission(A1672Filter filter) throws SQLException, Exception {
        List<A1674Filter> lstRtn = new ArrayList<A1674Filter>(0);
        A1674Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01665(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);
            cstmt01.setString(7, filter.VP_TYMEMO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1674Filter();

                objRtn.A1674TKT = rs01.getString("TKT");
                objRtn.A1674TRNCU = rs01.getString("A1674TRNCU");
                objRtn.A1674TIPO = rs01.getString("A1674TIPO");
                objRtn.A1674MORIG = rs01.getString("A1674MORIG");
                objRtn.A1674SEQ = rs01.getString("A1674SEQ");
                objRtn.A1674CUPON = rs01.getString("A1674CUPON");

                objRtn.A1674COMIA2 = rs01.getDouble("A1674COMIA");
                objRtn.A1674PCMIA2 = rs01.getDouble("A1674PCMIA");
                objRtn.A1674PCAGT2 = rs01.getDouble("A1674PCAGT");
                objRtn.A1674CORIG2 = rs01.getDouble("A1674CORIG");
                objRtn.A1674PODIF2 = rs01.getDouble("A1674PODIF");
                objRtn.A1674CODIF2 = rs01.getDouble("A1674CODIF");
                objRtn.A1674FLAG = rs01.getString("A1674FLAG");
                lstRtn.add(objRtn);
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

        return lstRtn;

    }

    public List<A1675Filter> searchLstTaxOnComi(A1672Filter filter) throws SQLException, Exception {
        List<A1675Filter> lstRtn = new ArrayList<A1675Filter>(0);
        A1675Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01666(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1675Filter();

                objRtn.A1675TKT = rs01.getString("TKT");
                objRtn.A1675TRNCU = rs01.getString("A1675TRNCU");
                objRtn.A1675TIPO = rs01.getString("A1675TIPO");
                objRtn.A1675MONED = rs01.getString("A1675MONED");
                objRtn.A1675SEQ = rs01.getString("A1675SEQ");
                objRtn.A1675CUPON = rs01.getString("A1675CUPON");
                objRtn.A1675OVMIA2 = rs01.getDouble("A1675OVMIA");
                objRtn.A1675POMIA2 = rs01.getDouble("A1675POMIA");
                objRtn.A1675OVORI2 = rs01.getDouble("A1675OVORI");
                objRtn.A1675POAGT2 = rs01.getDouble("A1675POAGT");
                objRtn.A1675OVDIF2 = rs01.getDouble("A1675OVDIF");
                objRtn.A1675PVDIF2 = rs01.getDouble("A1675PVDIF");

                lstRtn.add(objRtn);
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

        return lstRtn;

    }

    public List<SQP00989Filter> searchLstRazones(A1672Filter filter) throws SQLException, Exception {
        List<SQP00989Filter> lstRtn = new ArrayList<SQP00989Filter>(0);
        SQP00989Filter objRtn;
        Integer ind = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01730(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_SEQ);
            cstmt01.setString(4, filter.VP_CUPON);
            cstmt01.setString(5, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                ind = ind + 1;
                objRtn = new SQP00989Filter();

                objRtn.REASONS = rs01.getString("REASON");
                objRtn.A1672ERROR = rs01.getString("A2560CODRZ");
                objRtn.OPCION = ind.toString();//rst.getString("RN");   
                objRtn.A1663TYPE = rs01.getString("A1663TYPE");

                lstRtn.add(objRtn);
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

        return lstRtn;

    }

    public List<SQP00989Filter> searchLstFOP(A1672Filter filter) throws SQLException, Exception {
        List<SQP00989Filter> lstRtn = new ArrayList<SQP00989Filter>(0);
        SQP00989Filter objRtn;
        Integer ind = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01731(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_SEQ);
            cstmt01.setString(4, filter.VP_CUPON);
            cstmt01.setString(5, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                ind = ind + 1;
                objRtn = new SQP00989Filter();
                objRtn.A1672CIA = rs01.getString("A2657CIA");
                objRtn.A1672FORMA = rs01.getString("A2657FORMA");
                objRtn.A1672SERIE = rs01.getString("A2657SERIE");
                objRtn.A1672SEQ = rs01.getString("A2657SEQ");
                objRtn.A1672CUPON = rs01.getString("A2657CUPON");
                objRtn.A1672TRNCU = rs01.getString("A2657TRNCU");
                objRtn.A2657CORRL = rs01.getString("A2657CORRL");
                objRtn.A2657CFOP = rs01.getString("A2657CFOP");
                objRtn.A2657TFOP = rs01.getString("A2657TFOP");
                objRtn.A2657TTARJ = rs01.getString("A2657TTARJ");
                objRtn.A2657FPORI = rs01.getDouble("A2657FPORI");
                objRtn.A2657MORIG = rs01.getString("A2657MORIG");
                objRtn.A2657NREF = rs01.getString("A2657NREF");
                objRtn.A2657FO720 = rs01.getString("A2657FO720") + rs01.getString("A2657SE720");
                objRtn.A2657TR720 = rs01.getString("A2657TR720");

                lstRtn.add(objRtn);
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

        return lstRtn;

    }

    public List<A1672Filter> loadTracing(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;
        Integer ind = 0;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01882(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_SEQ);
            cstmt01.setString(4, filter.VP_CUPON);
            cstmt01.setString(5, filter.VP_TRNCU);
            cstmt01.setString(6, filter.A1672FPROC);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1672Filter();
                objRtn.A1672TIPOF = rs01.getString("A1672TYPE");
                objRtn.A1672REVIS = rs01.getString("A1672UASIG");
                objRtn.A1672FREGI = rs01.getString("A1672FASIG");
                objRtn.A1672ERROR = rs01.getString("A1672COMEN");
                objRtn.A1672FLADM = rs01.getString("A1672FLADM");
                objRtn.A1672NAMEF = rs01.getString("A1672FOLIO");
                objRtn.A1672RUTAF = rs01.getString("A1672ARCHV");
                objRtn.A1672STAT = rs01.getString("A1672ESTADO");
                objRtn.VP_FRMSRIE = rs01.getString("Number");

                lstRtn.add(objRtn);
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

        return lstRtn;

    }

    public String insertTracing(SQP00989Filter filter, ArrayList<SQP00989Filter> lstSelectedTkts, String NAMEARCHV) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String strUsuario, strFecha, strHora;
        session.getCNXIBMDB2().open();
        try {
            strUsuario = session.getUserView().getUserInfo().USR;
            strFecha = Functions.getFechaActual();
            strHora = Functions.getHoraActual();
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02283(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (SQP00989Filter obj : lstSelectedTkts) {

                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, obj.A1672CIA);
                cs.setString(3, obj.A1672FORMA);
                cs.setString(4, obj.A1672SERIE);
                cs.setString(5, obj.A1672AGENT);
                cs.setString(6, obj.A1672TRNCU);
                cs.setString(7, obj.A1672PAIVT);
                cs.setString(8, obj.A1672FUENT);//AREA
                cs.setString(9, obj.A1672SEQ);//BASE
                cs.setString(10, obj.A1672CUPON);
                cs.setString(11, NAMEARCHV);
                cs.setString(12, obj.A1672ITIN);
                cs.setString(13, obj.A1672FPROC);

                cs.setString(14, filter.OPCION);
                cs.setString(15, filter.ROUTE);
                cs.setString(16, filter.A1580DESC2);
                cs.setString(17, obj.A1672MONTT);
                cs.setString(18, obj.A1672ERROR);
                cs.setString(19, obj.A1672TTDIF);
                cs.setString(20, filter.A1672TICKET);

                cs.setString(21, "");
                cs.setString(22, strUsuario);
                cs.setString(23, strFecha);
                cs.setString(24, strHora);
                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public String Group() throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03415(?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);

            cs.execute();
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String searchIDFILE(A1672Filter filter) throws SQLException, Exception {

        String STR_RESULT = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP04759(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, "1");
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                STR_RESULT = rs01.getString("A1530IDFIL");
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

        return STR_RESULT;

    }

}
