package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A1740;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterFlownDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private A1740 objRtn = null;
    private A1740Filter objRtnFilter = null;
    private List<A1740> lstRtn = null;
    private List<A1740Filter> lstRtnFilter = null;
    // </editor-fold>

    public AccountingMasterFlownDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1740Filter> loadPX122S03A1740(A1740Filter filter) {
        lstRtnFilter = new ArrayList<>(0);
        A1740Filter objRtnFilter;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = 20, totRows = -1;

        try {
            //PX12200003
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04486(?,?,?,?,?,?,?)}"; // PX122S03A1740
            
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            //cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            /*cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);*/
            
            cs.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cs.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cs.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cs.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cs.setString(1, filter.IN_A1740TITRA);
            cs.setString(2, filter.IN_A1740TIPO);
            cs.setString(3, filter.IN_A1740CATEG);
            
            
            /*cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);*/
            
            cs.setInt("IO_PAGNUM", PAGINIT);
            cs.setInt("IO_PAGROW", totRowsPag);     
            cs.setInt("IO_TOTPAG", totRows);     
            cs.setInt("IO_TOTROW", filter.page.TOTROW); 

            cs.execute();

            /*filter.page.PAGNUM = cs.getInt(4);//1
            filter.page.PAGROW = cs.getInt(5);//20
            filter.page.TOTPAG = cs.getInt(6);//17
            filter.page.TOTROW = cs.getInt(7);//340
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt(6)) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cs.getInt(7);
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

            filter.page.TOTPAG = totPAGS;*/
            
            filter.page.PAGNUM = cs.getInt("IO_PAGNUM");
            filter.page.PAGROW = cs.getInt("IO_PAGROW");
            filter.page.TOTPAG = cs.getInt("IO_TOTPAG");
            filter.page.TOTROW = cs.getInt("IO_TOTROW");
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt("IO_PAGROW")) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cs.getInt("IO_TOTROW");
                   int total =  (int)(totRows / totRowsPag);                                                                    
                   int resto =  (totRows % totRowsPag);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }        
             
            filter.page.TOTPAG = totPAGS;

            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtnFilter = new A1740Filter();
                objRtnFilter.RN = rst.getLong("NO");
                objRtnFilter.A1740TITRA = rst.getString("A1740TITRA");
                objRtnFilter.A1740TIPO = rst.getString("A1740TIPO").trim();
                objRtnFilter.A1740TIPODESC = rst.getString("A1740TIPODESC");
                objRtnFilter.A1740SUBTI = rst.getString("A1740SUBTI");
                objRtnFilter.A1740CATEG = rst.getString("A1740CATEG");
                objRtnFilter.A1740CIA = rst.getString("A1740CIA");
                objRtnFilter.A1740UNIDA = rst.getString("A1740UNIDA");
                objRtnFilter.A1740CECOS = rst.getString("A1740CECOS");
                objRtnFilter.A1740UBICA = rst.getString("A1740UBICA");
                objRtnFilter.A1740CTA = rst.getString("A1740CTA");
                objRtnFilter.A1740SCTA = rst.getString("A1740SCTA");
                objRtnFilter.A1740EQUI = rst.getString("A1740EQUI");
                objRtnFilter.A1740INTNU = rst.getString("A1740INTNU");
                objRtnFilter.A1740ICIA = rst.getString("A1740ICIA");
                objRtnFilter.A1740CLIE = rst.getString("A1740CLIE");
                objRtnFilter.A1740FINI = Functions.getMonthConvertDate(rst.getString("A1740FINI"));
                objRtnFilter.A1740FFIN = Functions.getMonthConvertDate(rst.getString("A1740FFIN"));
                objRtnFilter.A1740REGIS = rst.getString("A1740REGIS");
                objRtnFilter.A1740FREGI = Functions.getMonthConvertDate(rst.getString("A1740FREGI"));
                objRtnFilter.A1740HREGI = Functions.ConvertedTime(rst.getString("A1740HREGI"));
                objRtnFilter.A1740REGVI = rst.getString("A1740REGVI");
                objRtnFilter.A1740FREVI = Functions.getMonthConvertDate(rst.getString("A1740FREVI"));
                objRtnFilter.A1740HREVI = Functions.ConvertedTime(rst.getString("A1740HREVI"));
                
                //Paginación ===================================================
                objRtnFilter.page.PAGNUM = filter.page.PAGNUM;
                objRtnFilter.page.PAGROW = filter.page.PAGROW;
                objRtnFilter.page.TOTPAG = filter.page.TOTPAG;
                objRtnFilter.page.TOTROW = filter.page.TOTROW;
                
                lstRtnFilter.add(objRtnFilter);
            }

        } catch (Exception ex) {
            System.out.println("-> " + ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtnFilter;
    }
    
    public String catalogueAccountMaintance(A1740Filter filter, String strOption) {
        String STR_RESULT = "";

        try {
            //PX12200004
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04487(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // PX122S04A1740
            //cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, strOption);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.A1740TITRA);
            cs.setString(4, filter.A1740TIPO);
            cs.setString(5, filter.A1740SUBTI);
            cs.setString(6, filter.A1740CATEG);
            cs.setString(7, filter.A1740CIA);
            cs.setString(8, filter.A1740UNIDA);
            cs.setString(9, filter.A1740CECOS);
            cs.setString(10, filter.A1740UBICA);
            cs.setString(11, filter.A1740CTA);
            cs.setString(12, filter.A1740SCTA);
            cs.setString(13, filter.A1740EQUI);
            cs.setString(14, filter.A1740ICIA);
            cs.setString(15, filter.A1740CLIE);
            cs.setString(16, filter.A1740FINI);
            cs.setString(17, filter.A1740FFIN);
            cs.setString(18, session.getUserView().getUserInfo().USR);
            cs.setString(19, Functions.getFechaActual());
            cs.setString(20, Functions.getHoraActual());
            cs.setString(21, filter.IN_A1740TITRA_OLD);
            cs.setString(22, filter.IN_A1740TIPO_OLD);
            cs.setString(23, filter.IN_A1740SUBTI_OLD);
            cs.setString(24, filter.IN_A1740CATEG_OLD);
            cs.setString(25, filter.A1740INTNU);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
        } catch (Exception ex) {
            System.out.println("-> " + ex.getMessage());
        } finally {
            setClose();
        }

        return STR_RESULT;
    }
    
    public List<A1740> loadDocumentType() throws SQLException {
        lstRtn = new ArrayList<>(0);
        
        try {
            //PX12200001
            strSQL = "{CALL " + session.getMainLibrary() + ".PX122S01A1740}";
            
            //cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1740();
                objRtn.A1740TITRA = rst.getString("A1740TITRA");
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            System.out.println("-> " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public List<A1740Filter> loadAccountType() throws SQLException {
        lstRtnFilter = new ArrayList<>(0);

        try {
            //PX12200002
            strSQL = "{CALL " + session.getMainLibrary() + ".PX122S02A1740}";
            
            //cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtnFilter = new A1740Filter();
                objRtnFilter.A1740TIPO = rst.getString("A1740TIPO");
                objRtnFilter.A1740TIPODESC = rst.getString("A1740TIPODESC");
                lstRtnFilter.add(objRtnFilter);
            }
        } catch (Exception ex) {
            System.out.println("-> " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtnFilter;
    }
    
    public List<A1740> loadCategory() throws SQLException {
        lstRtn = new ArrayList<>(0);
        
        try {
            //PX12200005
            strSQL = "{CALL " + session.getMainLibrary() + ".PX122S05A1740}";
            
            //cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1740();
                objRtn.A1740CATEG = rst.getString("A1740CATEG");
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            System.out.println("-> " + ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
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
