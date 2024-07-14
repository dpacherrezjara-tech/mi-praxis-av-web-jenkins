package net.miatech.praxis.dao.program;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.PX040S01A720Filter;
import net.miatech.beans.PX040S01A720ResultSet01;
import net.miatech.beans.PX040S01A720ResultSet02;
import net.miatech.beans.PX040S01A720ResultSet03;
import net.miatech.beans.PX040S01A720ResultSet04;
import net.miatech.beans.PX040S01A720ResultSet05;
import net.miatech.beans.PX040S01A720ResultSet07;
import net.miatech.beans.PX040S01A720ResultSet11;
import net.miatech.beans.PX040S01A720ResultSet12;
import net.miatech.beans.PX040S01A720ResultSet13;
import net.miatech.beans.PX040S01A720ResultSet14;
import net.miatech.beans.PX040S01A720ResultSet15;
import net.miatech.beans.PX040S02A720Filter;
import net.miatech.beans.SQP00250Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.beans.SQP03658Filter;
import net.miatech.beans.spring.UserView;
import net.miatech.praxis.A714;
import net.miatech.praxis.A720;
import static net.miatech.praxis.dao.payments.BankReconciliationDAO.pasarGarbageCollector;
import static net.miatech.praxis.dao.payments.LoadSalesConciliationDAO.pasarGarbageCollector;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class ProMasterTicketDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    @Deprecated
    public PX040S01A720Filter loadPX040S01A720(PX040S01A720Filter filter) throws SQLException, Exception {
        PX040S01A720ResultSet01 objRtn;
        PX040S01A720ResultSet02 objRtn02;
        PX040S01A720ResultSet03 objRtn03;
        PX040S01A720ResultSet04 objRtn04;
        PX040S01A720ResultSet05 objRtn05, objRtn06;
        PX040S01A720ResultSet07 objRtn07, objRtn08, objRtn09, objRtn10;
        PX040S01A720ResultSet11 objRtn11;
        PX040S01A720ResultSet12 objRtn12;
        PX040S01A720ResultSet13 objRtn13;
        PX040S01A720ResultSet14 objRtn14;
        PX040S01A720ResultSet15 objRtn15;

        PreparedStatement pstmt01 = null, pstmt02 = null;
        ResultSet rstst01 = null, rstst02 = null;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null, rs05 = null, rs06 = null, rs07 = null, rs08 = null, rs09 = null, rs10 = null, rs11 = null, rs12 = null, rs13 = null, rs14 = null, rs15 = null;
        //<editor-fold defaultstate="collapsed" desc="{...} SQL Sentences">
        String SQLQRY01 = "SELECT"
                + "   A720CIAI,A720FORMAI,A720SERIEI"
                + " FROM PRAXIS.A720 WHERE"
                + "   A720AIRLIN=? AND A720CIA=? AND A720FORMA=? AND A720SERIE=?"
                + " GROUP BY"
                + "   A720CIAI,A720FORMAI,A720SERIEI";
        String SQLQRY02 = "SELECT"
                + "   A720CIA,A720FORMA,A720SERIE,A720SEQ"
                + " FROM PRAXIS.A720 WHERE"
                + "   A720AIRLIN=? AND A720CIAI=? AND A720FORMAI=? AND A720SERIEI=?"
                + " ORDER BY"
                + "   A720SEQ ASC";
        String SQLCLL01 = "{CALL SQP00249(?,?,?,?,?)}";
        //</editor-fold>
        Connection cnx = null;
        int intCountA720 = 0;
        String strV_CIA = null, strV_FORMA = null, strV_SERIE = null;
        String strA720CIA = null, strA720FORMA = null, strA720SERIE = null, strA720SEQ = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            if(filter.IN_SEQ.isEmpty()){
                pstmt01 = cnx.prepareStatement(SQLQRY01);
                pstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                pstmt01.setString(2, filter.IN_CIA);
                pstmt01.setString(3, filter.IN_FORMA);
                pstmt01.setString(4, filter.IN_SERIE);
                rstst01 = pstmt01.executeQuery();
                while(rstst01.next()){
                    intCountA720++;
                    strV_CIA = rstst01.getString("A720CIAI");
                    strV_FORMA = rstst01.getString("A720FORMAI");
                    strV_SERIE = rstst01.getString("A720SERIEI");
                }
                if(intCountA720 == 1){
                    intCountA720 = 0;
                    pstmt02 = cnx.prepareStatement(SQLQRY02);
                    pstmt02.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    pstmt02.setString(2, strV_CIA);
                    pstmt02.setString(3, strV_FORMA);
                    pstmt02.setString(4, strV_SERIE);
                    rstst02 = pstmt02.executeQuery();
                    while(rstst02.next()){
                        intCountA720++;
                        strA720CIA = rstst02.getString("A720CIA");
                        strA720FORMA = rstst02.getString("A720FORMA");
                        strA720SERIE = rstst02.getString("A720SERIE");
                        strA720SEQ = rstst02.getString("A720SEQ");
                    }
                    if(intCountA720 == 1){
                        filter.IN_CIA = strA720CIA;
                        filter.IN_FORMA = strA720FORMA;
                        filter.IN_SERIE = strA720SERIE;
                        filter.IN_SEQ = strA720SEQ;
                    }
                }
            }
            if(!filter.IN_SEQ.isEmpty()){
                //<editor-fold defaultstate="collapsed" desc="{...} Call Store">
                cstmt01 = cnx.prepareCall(SQLCLL01);

                cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(2, filter.IN_CIA);
                cstmt01.setString(3, filter.IN_FORMA);
                cstmt01.setString(4, filter.IN_SERIE);
                cstmt01.setString(5, filter.IN_SEQ);

                cstmt01.execute();

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new PX040S01A720ResultSet01();
                    objRtn.fileA720.A720CIA = rs01.getString("A720CIA");
                    objRtn.fileA720.A720FORMA = rs01.getString("A720FORMA");
                    objRtn.fileA720.A720SERIE = rs01.getString("A720SERIE");
                    objRtn.fileA720.A720SEQ = rs01.getString("A720SEQ");

                    objRtn.fileA720.A720CIAI = rs01.getString("A720CIAI");
                    objRtn.fileA720.A720FORMAI = rs01.getString("A720FORMAI");
                    objRtn.fileA720.A720SERIEI = rs01.getString("A720SERIEI");
                    
                    objRtn.fileA720.A720AIRLIN = rs01.getString("A720AIRLIN");
                    objRtn.fileA720.A720GRUPO = rs01.getString("A720GRUPO");
                    objRtn.fileA720.A720ORIG = rs01.getString("A720ORIG");
                    objRtn.fileA720.A720IDFIL = rs01.getString("A720IDFIL");

                    objRtn.fileA720.A720PNR = rs01.getString("A720PNR");

                    objRtn.fileA1530.A1530FHAST = rs01.getString("A1530FHAST");
                    objRtn.fileA1530.A1530MDA = rs01.getString("A1530MDA");

                    objRtn.fileA720.A720AGENTE = rs01.getString("A720AGENTE");
                    objRtn.fileA720.A720FECVTA = rs01.getString("A720FECVTA");

                    objRtn.fileA003.A003KEY1 = rs01.getString("A003KEY1");
                    objRtn.fileA003.A003PROVIN = rs01.getString("A003PROVIN");
                    objRtn.fileA003.A003CIUDAD = rs01.getString("A003CIUDAD");
                    objRtn.fileA1007.A1007NOMCD = rs01.getString("A1007NOMCD");

                    objRtn.fileA720.A720PAX = rs01.getString("A720PAX");
                    objRtn.fileA720.A720TVENTA = rs01.getString("A720TVENTA");
                    objRtn.fileA720.A720FRESV = rs01.getString("A720FRESV");
                    objRtn.fileA720.A720CODIT = rs01.getString("A720CODIT");

                    objRtn.fileA1530.A1530FUENT = rs01.getString("A1530FUENT");
                    objRtn.fileA1530.A1530PSVTA = rs01.getString("A1530PSVTA");

                    objRtn.fileA720.A720SASI = rs01.getString("A720SASI");
                    objRtn.fileA720.A720TICAP = rs01.getString("A720TICAP");

                    objRtn.fileA720.A720ACCO = rs01.getString("A720ACCO");
                    objRtn.fileA720.A720ACCD = rs01.getString("A720ACCD");
                    objRtn.fileA720.A720ETKT = rs01.getString("A720ETKT");

                    objRtn.fileA1530.A1530FCONT = rs01.getString("A1530FCONT");
                    objRtn.fileA1530.A1530IDCON = rs01.getString("A1530IDCON");

                    objRtn.fileA1530.A1530TCAMB = rs01.getDouble("A1530TCAMB");
                    objRtn.fileA1530.A1530TCAMP = rs01.getDouble("A1530TCAMP");

                    objRtn.fileA720.A720TARI1 = rs01.getDouble("A720TARI1");
                    objRtn.fileA720.A720TARI2 = rs01.getDouble("A720TARI2");
                    objRtn.fileA720.A720TARI3 = rs01.getDouble("A720TARI3");
                    objRtn.fileA720.A720TARI4 = rs01.getDouble("A720TARI4");
                    objRtn.fileA720.A720TQ = rs01.getDouble("A720TQ");
                    objRtn.fileA720.A720TQRV = rs01.getDouble("A720TQRV");

                    objRtn.fileA720.A720TARIFA = rs01.getDouble("A720TARIFA");
                    objRtn.fileA720.A720MONEDA = rs01.getString("A720MONEDA");
                    objRtn.fileA720.A720TRFPAG = rs01.getDouble("A720TRFPAG");
                    objRtn.fileA720.A720MDAPAG = rs01.getString("A720MDAPAG");
                    objRtn.fileA720.A720TCOM = rs01.getDouble("A720TCOM");
                    objRtn.fileA720.A720TCOMRV = rs01.getDouble("A720TCOMRV");
                    objRtn.fileA720.A720MDACM = rs01.getString("A720MDACM");
                    objRtn.fileA720.A720MDARV = rs01.getString("A720MDARV");

                    objRtn.fileA720.A720COMMIS = rs01.getDouble("A720COMMIS");
                    objRtn.fileA720.A720TSCM = rs01.getDouble("A720TSCM");
                    objRtn.fileA720.A720MDACOM = rs01.getString("A720MDACOM");

                    objRtn.fileA720.A720ROE = rs01.getDouble("A720ROE");
                    objRtn.fileA720.A720FARE = rs01.getDouble("A720FARE");
                    objRtn.fileA720.A720TKVOID = rs01.getString("A720TKVOID");

                    objRtn.fileA720.A720TCAMB = rs01.getDouble("A720TCAMB");

                    objRtn.fileA720.A720YQ1 = rs01.getDouble("A720YQ1");
                    objRtn.fileA720.A720YQ2 = rs01.getDouble("A720YQ2");
                    objRtn.fileA720.A720YQ3 = rs01.getDouble("A720YQ3");
                    objRtn.fileA720.A720YQ4 = rs01.getDouble("A720YQ4");

                    objRtn.fileA720.A720PRRCM1 = rs01.getDouble("A720PRRCM1");
                    objRtn.fileA720.A720PRRCM2 = rs01.getDouble("A720PRRCM2");
                    objRtn.fileA720.A720PRRCM3 = rs01.getDouble("A720PRRCM3");
                    objRtn.fileA720.A720PRRCM4 = rs01.getDouble("A720PRRCM4");

                    objRtn.fileA720.A720PRSCM1 = rs01.getDouble("A720PRSCM1");
                    objRtn.fileA720.A720PRSCM2 = rs01.getDouble("A720PRSCM2");
                    objRtn.fileA720.A720PRSCM3 = rs01.getDouble("A720PRSCM3");
                    objRtn.fileA720.A720PRSCM4 = rs01.getDouble("A720PRSCM4");

                    objRtn.fileA720.A720VALOR1 = rs01.getDouble("A720VALOR1");
                    objRtn.fileA720.A720VALOR2 = rs01.getDouble("A720VALOR2");
                    objRtn.fileA720.A720VALOR3 = rs01.getDouble("A720VALOR3");
                    objRtn.fileA720.A720VALOR4 = rs01.getDouble("A720VALOR4");

                    objRtn.fileA720.A720ORIGEX = rs01.getDouble("A720ORIGEX");
                    /**/
                    objRtn.fileA720.A720TTCOMM = rs01.getDouble("A720TTCOMM");
                    objRtn.fileA720.A720TTSCMM = rs01.getDouble("A720TTSCMM");

                    objRtn.fileA720.A720TYQ = rs01.getDouble("A720TYQ");

                    objRtn.fileA720.A720VALOL1 = rs01.getDouble("A720VALOL1");
                    objRtn.fileA720.A720VALOL2 = rs01.getDouble("A720VALOL2");
                    objRtn.fileA720.A720VALOL3 = rs01.getDouble("A720VALOL3");
                    objRtn.fileA720.A720VALOL4 = rs01.getDouble("A720VALOL4");

                    objRtn.fileA720.A720LRRCM1 = rs01.getDouble("A720LRRCM1");
                    objRtn.fileA720.A720LRRCM2 = rs01.getDouble("A720LRRCM2");
                    objRtn.fileA720.A720LRRCM3 = rs01.getDouble("A720LRRCM3");
                    objRtn.fileA720.A720LRRCM4 = rs01.getDouble("A720LRRCM4");

                    objRtn.fileA720.A720LRSCM1 = rs01.getDouble("A720LRSCM1");
                    objRtn.fileA720.A720LRSCM2 = rs01.getDouble("A720LRSCM2");
                    objRtn.fileA720.A720LRSCM3 = rs01.getDouble("A720LRSCM3");
                    objRtn.fileA720.A720LRSCM4 = rs01.getDouble("A720LRSCM4");

                    objRtn.fileA720.A720LYQ1 = rs01.getDouble("A720LYQ1");
                    objRtn.fileA720.A720LYQ2 = rs01.getDouble("A720LYQ2");
                    objRtn.fileA720.A720LYQ3 = rs01.getDouble("A720LYQ3");
                    objRtn.fileA720.A720LYQ4 = rs01.getDouble("A720LYQ4");

                    objRtn.fileA720.A720BOOKI1 = rs01.getString("A720BOOKI1");
                    objRtn.fileA720.A720BOOKI2 = rs01.getString("A720BOOKI2");
                    objRtn.fileA720.A720BOOKI3 = rs01.getString("A720BOOKI3");
                    objRtn.fileA720.A720BOOKI4 = rs01.getString("A720BOOKI4");

                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 1">
                    objRtn.fileA720.A720CONEX1 = rs01.getString("A720CONEX1");
                    objRtn.fileA720.A720RUTA0 = rs01.getString("A720RUTA0");
                    objRtn.fileA720.A720RUTA1 = rs01.getString("A720RUTA1");
                    objRtn.fileA720.A720CARRA1 = rs01.getString("A720CARRA1");
                    objRtn.fileA720.A720NVLO1 = rs01.getString("A720NVLO1");
                    objRtn.fileA720.A720FVLO1 = rs01.getString("A720FVLO1");
                    objRtn.fileA720.A720HVLO1 = rs01.getString("A720HVLO1");
                    objRtn.fileA720.A720FBST1 = rs01.getString("A720FBST1");
                    objRtn.fileA720.A720CLASE1 = rs01.getString("A720CLASE1");
                    objRtn.fileA720.A720FBUSO1 = rs01.getString("A720FBUSO1");
                    objRtn.fileA720.A720CARRO1 = rs01.getString("A720CARRO1");
                    objRtn.fileA720.A720NVLOO1 = rs01.getString("A720NVLOO1");
                    objRtn.fileA720.A720NBDA1 = rs01.getString("A720NBDA1");
                    objRtn.fileA720.A720NADA1 = rs01.getString("A720NADA1");
                    objRtn.fileA720.Leg1 = rs01.getString("LEG1");
                    objRtn.fileA720.LegSales1 = rs01.getString("LEG1_SALES");
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 2">
                    objRtn.fileA720.A720CONEX2 = rs01.getString("A720CONEX2");
                    objRtn.fileA720.A720RUTA2 = rs01.getString("A720RUTA2");
                    objRtn.fileA720.A720CARRA2 = rs01.getString("A720CARRA2");
                    objRtn.fileA720.A720NVLO2 = rs01.getString("A720NVLO2");
                    objRtn.fileA720.A720FVLO2 = rs01.getString("A720FVLO2");
                    objRtn.fileA720.A720HVLO2 = rs01.getString("A720HVLO2");
                    objRtn.fileA720.A720FBST2 = rs01.getString("A720FBST2");
                    objRtn.fileA720.A720CLASE2 = rs01.getString("A720CLASE2");
                    objRtn.fileA720.A720FBUSO2 = rs01.getString("A720FBUSO2");
                    objRtn.fileA720.A720CARRO2 = rs01.getString("A720CARRO2");
                    objRtn.fileA720.A720NVLOO2 = rs01.getString("A720NVLOO2");
                    objRtn.fileA720.A720NBDA2 = rs01.getString("A720NBDA2");
                    objRtn.fileA720.A720NADA2 = rs01.getString("A720NADA2");
                    objRtn.fileA720.Leg2 = rs01.getString("LEG2");
                    objRtn.fileA720.LegSales2 = rs01.getString("LEG2_SALES");
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 3">
                    objRtn.fileA720.A720CONEX3 = rs01.getString("A720CONEX3");
                    objRtn.fileA720.A720RUTA3 = rs01.getString("A720RUTA3");
                    objRtn.fileA720.A720CARRA3 = rs01.getString("A720CARRA3");
                    objRtn.fileA720.A720NVLO3 = rs01.getString("A720NVLO3");
                    objRtn.fileA720.A720FVLO3 = rs01.getString("A720FVLO3");
                    objRtn.fileA720.A720HVLO3 = rs01.getString("A720HVLO3");
                    objRtn.fileA720.A720FBST3 = rs01.getString("A720FBST3");
                    objRtn.fileA720.A720CLASE3 = rs01.getString("A720CLASE3");
                    objRtn.fileA720.A720FBUSO3 = rs01.getString("A720FBUSO3");
                    objRtn.fileA720.A720CARRO3 = rs01.getString("A720CARRO3");
                    objRtn.fileA720.A720NVLOO3 = rs01.getString("A720NVLOO3");
                    objRtn.fileA720.A720NBDA3 = rs01.getString("A720NBDA3");
                    objRtn.fileA720.A720NADA3 = rs01.getString("A720NADA3");
                    objRtn.fileA720.Leg3 = rs01.getString("LEG3");
                    objRtn.fileA720.LegSales3 = rs01.getString("LEG3_SALES");
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 4">
                    objRtn.fileA720.A720CONEX4 = rs01.getString("A720CONEX4");
                    objRtn.fileA720.A720RUTA4 = rs01.getString("A720RUTA4");
                    objRtn.fileA720.A720CARRA4 = rs01.getString("A720CARRA4");
                    objRtn.fileA720.A720NVLO4 = rs01.getString("A720NVLO4");
                    objRtn.fileA720.A720FVLO4 = rs01.getString("A720FVLO4");
                    objRtn.fileA720.A720HVLO4 = rs01.getString("A720HVLO4");
                    objRtn.fileA720.A720FBST4 = rs01.getString("A720FBST4");
                    objRtn.fileA720.A720CLASE4 = rs01.getString("A720CLASE4");
                    objRtn.fileA720.A720FBUSO4 = rs01.getString("A720FBUSO4");
                    objRtn.fileA720.A720CARRO4 = rs01.getString("A720CARRO4");
                    objRtn.fileA720.A720NVLOO4 = rs01.getString("A720NVLOO4");
                    objRtn.fileA720.A720NBDA4 = rs01.getString("A720NBDA4");
                    objRtn.fileA720.A720NADA4 = rs01.getString("A720NADA4");
                    objRtn.fileA720.Leg4 = rs01.getString("LEG4");
                    objRtn.fileA720.LegSales4 = rs01.getString("LEG4_SALES");
                    //</editor-fold>

                    objRtn.fileA720.A720TDOC = rs01.getString("A720TDOC");
                    objRtn.fileA720.A720TDOC_COD = rs01.getString("A720TDOC_COD");
                    objRtn.fileA720.A720TDOC_CON = rs01.getString("A720TDOC_CON");

                    objRtn.fileA720.A720TRNCU = rs01.getString("A720TRNCU");

                    objRtn.fileA720.A1672_AUDITED = rs01.getInt("A1672_AUDITED");
                    objRtn.fileA720.A1672_MEMORAISED = rs01.getInt("A1672_MEMORAISED");
                    objRtn.fileA720.A1672_PREME = rs01.getString("A1672_PREME");
                    objRtn.fileA720.A2548_NMEMO = (rs01.getObject("A2548_NMEMO")==null ? "": rs01.getString("A2548_NMEMO"));
                    objRtn.fileA720.A2289_ESTADO = rs01.getString("CHG").trim();
                    filter.lstResultSet01.add(objRtn);
                }
                if (cstmt01.getMoreResults()) {
                    rs02 = cstmt01.getResultSet();
                    while (rs02.next()) {
                        objRtn02 = new PX040S01A720ResultSet02();
                        objRtn02.fileA730.A730CIA = rs02.getString("A730CIA");
                        objRtn02.fileA730.A730FORMA = rs02.getString("A730FORMA");
                        objRtn02.fileA730.A730SERIE = rs02.getString("A730SERIE");

                        objRtn02.fileA730.A730LOHO1 = rs02.getString("A730LOHO1");
                        objRtn02.fileA730.A730LOHO2 = rs02.getString("A730LOHO2");
                        objRtn02.fileA730.A730LOHO3 = rs02.getString("A730LOHO3");
                        objRtn02.fileA730.A730LOHO4 = rs02.getString("A730LOHO4");
                        objRtn02.fileA730.A730CUPON1 = rs02.getString("A730CUPON1");
                        objRtn02.fileA730.A730CUPON2 = rs02.getString("A730CUPON2");
                        objRtn02.fileA730.A730CUPON3 = rs02.getString("A730CUPON3");
                        objRtn02.fileA730.A730CUPON4 = rs02.getString("A730CUPON4");
                        objRtn02.fileA730.A730MONREG = rs02.getString("A730MONREG");
                        objRtn02.fileA730.A730FECVTA = rs02.getString("A730FECVTA");

                        objRtn02.fileA730.A730CIA720 = rs02.getString("A730CIA720");
						objRtn02.fileA730.A720TKVOID = rs02.getString("A720TKVOID");
                        objRtn02.fileA730.A730FOR720 = rs02.getString("A730FOR720");
                        objRtn02.fileA730.A730SER720 = rs02.getString("A730SER720");
                        objRtn02.fileA730.A730SEQUEN = rs02.getString("A730SEQUEN");
                        objRtn02.fileA730.A730SEQ720 = rs02.getString("A730SEQ720");
                        objRtn02.fileA730.A730TYPCP1 = rs02.getString("A730TYPCP1");

                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 1">
                        objRtn02.fileA730.A730CONEX1 = rs02.getString("A730CONEX1");
                        objRtn02.fileA730.A730RUTA0 = rs02.getString("A730RUTA0");
                        objRtn02.fileA730.A730RUTA1 = rs02.getString("A730RUTA1");
                        objRtn02.fileA730.A730CARRA1 = rs02.getString("A730CARRA1");
                        objRtn02.fileA730.A730NVLO1 = rs02.getString("A730NVLO1");
                        objRtn02.fileA730.A730FVLO1 = rs02.getString("A730FVLO1");
                        objRtn02.fileA730.A730CLASE1 = rs02.getString("A730CLASE1");
                        objRtn02.fileA730.A730FBUSO1 = rs02.getString("A730FBUSO1");
                        objRtn02.fileA730.A730VALOR1 = rs02.getDouble("A730VALOR1");
                        objRtn02.fileA730.A730Q1 = rs02.getDouble("A730Q1");
                        objRtn02.fileA730.A730PRRCM1 = rs02.getDouble("A730PRRCM1");
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 2">
                        objRtn02.fileA730.A730CONEX2 = rs02.getString("A730CONEX2");
                        objRtn02.fileA730.A730RUTA2 = rs02.getString("A730RUTA2");
                        objRtn02.fileA730.A730CARRA2 = rs02.getString("A730CARRA2");
                        objRtn02.fileA730.A730NVLO2 = rs02.getString("A730NVLO2");
                        objRtn02.fileA730.A730FVLO2 = rs02.getString("A730FVLO2");
                        objRtn02.fileA730.A730CLASE2 = rs02.getString("A730CLASE2");
                        objRtn02.fileA730.A730FBUSO2 = rs02.getString("A730FBUSO2");
                        objRtn02.fileA730.A730VALOR2 = rs02.getDouble("A730VALOR2");
                        objRtn02.fileA730.A730Q2 = rs02.getDouble("A730Q2");
                        objRtn02.fileA730.A730PRRCM2 = rs02.getDouble("A730PRRCM2");
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 3">
                        objRtn02.fileA730.A730CONEX3 = rs02.getString("A730CONEX3");
                        objRtn02.fileA730.A730RUTA3 = rs02.getString("A730RUTA3");
                        objRtn02.fileA730.A730CARRA3 = rs02.getString("A730CARRA3");
                        objRtn02.fileA730.A730NVLO3 = rs02.getString("A730NVLO3");
                        objRtn02.fileA730.A730FVLO3 = rs02.getString("A730FVLO3");
                        objRtn02.fileA730.A730CLASE3 = rs02.getString("A730CLASE3");
                        objRtn02.fileA730.A730FBUSO3 = rs02.getString("A730FBUSO3");
                        objRtn02.fileA730.A730VALOR3 = rs02.getDouble("A730VALOR3");
                        objRtn02.fileA730.A730Q3 = rs02.getDouble("A730Q3");
                        objRtn02.fileA730.A730PRRCM3 = rs02.getDouble("A730PRRCM3");
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 4">
                        objRtn02.fileA730.A730CONEX4 = rs02.getString("A730CONEX4");
                        objRtn02.fileA730.A730RUTA4 = rs02.getString("A730RUTA4");
                        objRtn02.fileA730.A730CARRA4 = rs02.getString("A730CARRA4");
                        objRtn02.fileA730.A730NVLO4 = rs02.getString("A730NVLO4");
                        objRtn02.fileA730.A730FVLO4 = rs02.getString("A730FVLO4");
                        objRtn02.fileA730.A730CLASE4 = rs02.getString("A730CLASE4");
                        objRtn02.fileA730.A730FBUSO4 = rs02.getString("A730FBUSO4");
                        objRtn02.fileA730.A730VALOR4 = rs02.getDouble("A730VALOR4");
                        objRtn02.fileA730.A730Q4 = rs02.getDouble("A730Q4");
                        objRtn02.fileA730.A730PRRCM4 = rs02.getDouble("A730PRRCM4");
                        //</editor-fold>
                        filter.lstResultSet02.add(objRtn02);
                    }
                    if (cstmt01.getMoreResults()) {
                        rs03 = cstmt01.getResultSet();
                        while (rs03.next()) {
                            objRtn03 = new PX040S01A720ResultSet03();
                            objRtn03.fileA713.A713SEQ = rs03.getString("A713SEQ");
                            objRtn03.fileA713.A713CIA = rs03.getString("A713CIA");
                            objRtn03.fileA713.A713FORMA = rs03.getString("A713FORMA");
                            objRtn03.fileA713.A713SERIE = rs03.getString("A713SERIE");

                            objRtn03.fileA713.A713MONREG = rs03.getString("A713MONREG");
                            objRtn03.fileA713.A713FECVTA = rs03.getString("A713FECVTA");
                            objRtn03.fileA713.A713TDOC = rs03.getString("A713TDOC");
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 1">
                            objRtn03.fileA713.A713CONEX1 = rs03.getString("A713CONEX1");
                            objRtn03.fileA713.A713RUTA0 = rs03.getString("A713RUTA0");
                            objRtn03.fileA713.A713RUTA1 = rs03.getString("A713RUTA1");
                            objRtn03.fileA713.A713CARRA1 = rs03.getString("A713CARRA1");
                            objRtn03.fileA713.A713NVLO1 = rs03.getString("A713NVLO1");
                            objRtn03.fileA713.A713FVLO1 = rs03.getString("A713FVLO1");
                            objRtn03.fileA713.A713CLASE1 = rs03.getString("A713CLASE1");
                            objRtn03.fileA713.A713FBUSO1 = rs03.getString("A713FBUSO1");
                            objRtn03.fileA713.A713VALOR1 = rs03.getDouble("A713VALOR1");
                            objRtn03.fileA713.A713Q1 = rs03.getDouble("A713Q1");
                            objRtn03.fileA713.A713PRRCM1 = rs03.getDouble("A713PRRCM1");
                            //</editor-fold>
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 2">
                            objRtn03.fileA713.A713CONEX2 = rs03.getString("A713CONEX2");
                            objRtn03.fileA713.A713RUTA2 = rs03.getString("A713RUTA2");
                            objRtn03.fileA713.A713CARRA2 = rs03.getString("A713CARRA2");
                            objRtn03.fileA713.A713NVLO2 = rs03.getString("A713NVLO2");
                            objRtn03.fileA713.A713FVLO2 = rs03.getString("A713FVLO2");
                            objRtn03.fileA713.A713CLASE2 = rs03.getString("A713CLASE2");
                            objRtn03.fileA713.A713FBUSO2 = rs03.getString("A713FBUSO2");
                            objRtn03.fileA713.A713VALOR2 = rs03.getDouble("A713VALOR2");
                            objRtn03.fileA713.A713Q2 = rs03.getDouble("A713Q2");
                            objRtn03.fileA713.A713PRRCM2 = rs03.getDouble("A713PRRCM2");
                            //</editor-fold>
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 3">
                            objRtn03.fileA713.A713CONEX3 = rs03.getString("A713CONEX3");
                            objRtn03.fileA713.A713RUTA3 = rs03.getString("A713RUTA3");
                            objRtn03.fileA713.A713CARRA3 = rs03.getString("A713CARRA3");
                            objRtn03.fileA713.A713NVLO3 = rs03.getString("A713NVLO3");
                            objRtn03.fileA713.A713FVLO3 = rs03.getString("A713FVLO3");
                            objRtn03.fileA713.A713CLASE3 = rs03.getString("A713CLASE3");
                            objRtn03.fileA713.A713FBUSO3 = rs03.getString("A713FBUSO3");
                            objRtn03.fileA713.A713VALOR3 = rs03.getDouble("A713VALOR3");
                            objRtn03.fileA713.A713Q3 = rs03.getDouble("A713Q3");
                            objRtn03.fileA713.A713PRRCM3 = rs03.getDouble("A713PRRCM3");
                            //</editor-fold>
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 4">
                            objRtn03.fileA713.A713CONEX4 = rs03.getString("A713CONEX4");
                            objRtn03.fileA713.A713RUTA4 = rs03.getString("A713RUTA4");
                            objRtn03.fileA713.A713CARRA4 = rs03.getString("A713CARRA4");
                            objRtn03.fileA713.A713NVLO4 = rs03.getString("A713NVLO4");
                            objRtn03.fileA713.A713FVLO4 = rs03.getString("A713FVLO4");
                            objRtn03.fileA713.A713CLASE4 = rs03.getString("A713CLASE4");
                            objRtn03.fileA713.A713FBUSO4 = rs03.getString("A713FBUSO4");
                            objRtn03.fileA713.A713VALOR4 = rs03.getDouble("A713VALOR4");
                            objRtn03.fileA713.A713Q4 = rs03.getDouble("A713Q4");
                            objRtn03.fileA713.A713PRRCM4 = rs03.getDouble("A713PRRCM4");
                            //</editor-fold>
                            objRtn03.fileA713.A713CPUI = rs03.getString("A713CPUI");

                            objRtn03.fileA713.A713CUPON1 = rs03.getString("A713CUPON1");
                            objRtn03.fileA713.A713CUPON2 = rs03.getString("A713CUPON2");
                            objRtn03.fileA713.A713CUPON3 = rs03.getString("A713CUPON3");
                            objRtn03.fileA713.A713CUPON4 = rs03.getString("A713CUPON4");
                            filter.lstResultSet03.add(objRtn03);
                        }
                        if (cstmt01.getMoreResults()) {
                            rs04 = cstmt01.getResultSet();
                            while (rs04.next()) {
                                objRtn04 = new PX040S01A720ResultSet04();
                                objRtn04.fileA1721.A1721TIPO = rs04.getString("A1721TIPO");
                                objRtn04.fileA1721.A1721FRCA = rs04.getString("A1721FRCA");
                                filter.lstResultSet04.add(objRtn04);
                            }
                            if (cstmt01.getMoreResults()) {
                                rs05 = cstmt01.getResultSet();
                                while (rs05.next()) {
                                    objRtn05 = new PX040S01A720ResultSet05();
                                    objRtn05.fileA1532.A1532CTAX = rs05.getString("A1532CTAX");
                                    objRtn05.fileA1532.A1532MTAX = rs05.getString("A1532MTAX");
                                    objRtn05.fileA1532.A1532VTAX = rs05.getDouble("A1532VTAX");
                                    filter.lstResultSet05.add(objRtn05);
                                }
                                if (cstmt01.getMoreResults()) {
                                    rs06 = cstmt01.getResultSet();
                                    while (rs06.next()) {
                                        objRtn06 = new PX040S01A720ResultSet05();
                                        objRtn06.fileA1532.A1532CTAX = rs06.getString("A1532CTAX");
                                        objRtn06.fileA1532.A1532MTAX = rs06.getString("A1532MTAX");
                                        objRtn06.fileA1532.A1532VTAX = rs06.getDouble("A1532VTAX");
                                        filter.lstResultSet06.add(objRtn06);
                                    }
                                    if (cstmt01.getMoreResults()) {
                                        rs07 = cstmt01.getResultSet();
                                        while (rs07.next()) {
                                            objRtn07 = new PX040S01A720ResultSet07();
                                            objRtn07.fileA1531.A1531CFOP = rs07.getString("A1531CFOP");
                                            objRtn07.fileA1531.A1531TFOP = rs07.getString("A1531TFOP");
                                            objRtn07.fileA1531.A1531TTARJ = rs07.getString("A1531TTARJ");
                                            objRtn07.fileA1531.A1531VFOP = rs07.getDouble("A1531VFOP");
                                            objRtn07.fileA1531.A1531MFOP = rs07.getString("A1531MFOP");
                                            objRtn07.fileA1531.A1531NREF = rs07.getString("A1531NREF");
                                            objRtn07.fileA1531.A1531CAPL = rs07.getString("A1531CAPL");
                                            filter.lstResultSet07.add(objRtn07);
                                        }
                                        if (cstmt01.getMoreResults()) {
                                            rs08 = cstmt01.getResultSet();
                                            while (rs08.next()) {
                                                objRtn08 = new PX040S01A720ResultSet07();
                                                objRtn08.fileA1531.A1531CFOP = rs08.getString("A1531CFOP");
                                                objRtn08.fileA1531.A1531TFOP = rs08.getString("A1531TFOP");
                                                objRtn08.fileA1531.A1531TTARJ = rs08.getString("A1531TTARJ");
                                                objRtn08.fileA1531.A1531VFOP = rs08.getDouble("A1531VFOP");
                                                objRtn08.fileA1531.A1531MFOP = rs08.getString("A1531MFOP");
                                                objRtn08.fileA1531.A1531NREF = rs08.getString("A1531NREF");
                                                objRtn08.fileA1531.A1531CAPL = rs08.getString("A1531CAPL");
                                                filter.lstResultSet08.add(objRtn08);
                                            }
                                            if (cstmt01.getMoreResults()) {
                                                rs09 = cstmt01.getResultSet();
                                                while (rs09.next()) {
                                                    objRtn09 = new PX040S01A720ResultSet07();
                                                    objRtn09.fileA1531.A1531CFOP = rs09.getString("A1531CFOP");
                                                    objRtn09.fileA1531.A1531TFOP = rs09.getString("A1531TFOP");
                                                    objRtn09.fileA1531.A1531TTARJ = rs09.getString("A1531TTARJ");
                                                    objRtn09.fileA1531.A1531VFOP = rs09.getDouble("A1531VFOP");
                                                    objRtn09.fileA1531.A1531MFOP = rs09.getString("A1531MFOP");
                                                    objRtn09.fileA1531.A1531NREF = rs09.getString("A1531NREF");
                                                    objRtn09.fileA1531.A1531CAPL = rs09.getString("A1531CAPL");
                                                    filter.lstResultSet09.add(objRtn09);
                                                }
                                                if (cstmt01.getMoreResults()) {
                                                    rs10 = cstmt01.getResultSet();
                                                    while (rs10.next()) {
                                                        objRtn10 = new PX040S01A720ResultSet07();
                                                        objRtn10.fileA1531.A1531NREF = rs10.getString("A1531NREF");
                                                        objRtn10.fileA1531.A1531CAPL = rs10.getString("A1531CAPL");
                                                        objRtn10.fileA1531.A1531SEQ730 = rs10.getString("A1531SEQ730");
                                                        filter.lstResultSet10.add(objRtn10);
                                                    }
                                                    if (cstmt01.getMoreResults()) {
                                                        rs11 = cstmt01.getResultSet();
                                                        while (rs11.next()) {
                                                            objRtn11 = new PX040S01A720ResultSet11();
                                                            objRtn11.fileA1692.SEQ = rs11.getString("SEQ");
                                                            objRtn11.fileA1692.SEQRO = rs11.getString("SEQRO");
                                                            objRtn11.fileA1692.CCIA = rs11.getString("CCIA");
                                                            objRtn11.fileA1692.FORMA = rs11.getString("FORMA");
                                                            objRtn11.fileA1692.SERIE = rs11.getString("SERIE");
                                                            objRtn11.fileA1692.CUPON = rs11.getString("CUPON");
                                                            objRtn11.fileA1692.CDEPART = rs11.getString("CDEPART");
                                                            objRtn11.fileA1692.CARRIVA = rs11.getString("CARRIVA");
                                                            objRtn11.fileA1692.CARR = rs11.getString("CARR");
                                                            objRtn11.fileA1692.NFLIGHT = rs11.getString("NFLIGHT");
                                                            objRtn11.fileA1692.DFLIGHT = rs11.getString("DFLIGHT");
                                                            objRtn11.fileA1692.CLAS = rs11.getString("CLAS");
                                                            objRtn11.fileA1692.FBASE = rs11.getString("FBASE");
                                                            objRtn11.fileA1692.VCPN = rs11.getDouble("VCPN");
                                                            objRtn11.fileA1692.MDACP = rs11.getString("MDACP");
                                                            filter.lstResultSet11.add(objRtn11);
                                                        }
                                                        if (cstmt01.getMoreResults()) {
                                                            rs12 = cstmt01.getResultSet();
                                                            while (rs12.next()) {
                                                                objRtn12 = new PX040S01A720ResultSet12();
                                                                objRtn12.fileA1818.SEQ = rs12.getString("SEQ");
                                                                objRtn12.fileA1818.CCIA = rs12.getString("CCIA");
                                                                objRtn12.fileA1818.FORMA = rs12.getString("FORMA");
                                                                objRtn12.fileA1818.SERIE = rs12.getString("SERIE");
                                                                objRtn12.fileA1818.CUPON = rs12.getString("CUPON");
                                                                objRtn12.fileA1818.SEQ = rs12.getString("SEQ");
                                                                objRtn12.fileA1818.SEQRO = rs12.getString("SEQRO");
                                                                objRtn12.fileA1818.CDEPART = rs12.getString("CDEPART");
                                                                objRtn12.fileA1818.CARRIVA = rs12.getString("CARRIVA");
                                                                objRtn12.fileA1818.CARR = rs12.getString("CARR");
                                                                objRtn12.fileA1818.NFLIGHT = rs12.getString("NFLIGHT");
                                                                objRtn12.fileA1818.DFLIGHT = rs12.getString("DFLIGHT");
                                                                objRtn12.fileA1818.CLAS = rs12.getString("CLAS");
                                                                objRtn12.fileA1818.FBASE = rs12.getString("FBASE");
                                                                objRtn12.fileA1818.VCPN = rs12.getDouble("VCPN");
                                                                objRtn12.fileA1818.MDACP = rs12.getString("MDACP");
                                                                filter.lstResultSet12.add(objRtn12);
                                                            }
                                                            if (cstmt01.getMoreResults()) {
                                                                rs13 = cstmt01.getResultSet();
                                                                while (rs13.next()) {
                                                                    objRtn13 = new PX040S01A720ResultSet13();
                                                                    objRtn13.fileA1200.SEQ = rs13.getString("SEQ");
                                                                    objRtn13.fileA1200.CCIA = rs13.getString("CCIA");
                                                                    objRtn13.fileA1200.FORMA = rs13.getString("FORMA");
                                                                    objRtn13.fileA1200.SERIE = rs13.getString("SERIE");
                                                                    objRtn13.fileA1200.CUPON = rs13.getString("CUPON");
                                                                    objRtn13.fileA1200.RUTA_FROM = rs13.getString("RUTA_FROM");
                                                                    objRtn13.fileA1200.RUTA_TO = rs13.getString("RUTA_TO");
                                                                    objRtn13.fileA1200.CARR = rs13.getString("CARR");
                                                                    objRtn13.fileA1200.DFLIGHT = rs13.getString("DFLIGHT");
                                                                    objRtn13.fileA1200.FBASIS = rs13.getString("FBASIS");
                                                                    objRtn13.fileA1200.GROSS = rs13.getDouble("GROSS");
                                                                    objRtn13.fileA1200.CURRENC = rs13.getString("CURRENC");
                                                                    filter.lstResultSet13.add(objRtn13);
                                                                }
                                                                if (cstmt01.getMoreResults()) {
                                                                    rs14 = cstmt01.getResultSet();
                                                                    while (rs14.next()) {
                                                                        objRtn14 = new PX040S01A720ResultSet14();
                                                                        objRtn14.fileA2033.CIA = rs14.getString("CIA");
                                                                        objRtn14.fileA2033.FORMA = rs14.getString("FORMA");
                                                                        objRtn14.fileA2033.SERIE = rs14.getString("SERIE");
                                                                        objRtn14.fileA2033.CUPON = rs14.getString("CUPON");
                                                                        objRtn14.fileA2033.SEQ = rs14.getString("SEQ");
                                                                        objRtn14.fileA2033.RUTA_FROM = rs14.getString("RUTA_FROM");
                                                                        objRtn14.fileA2033.RUTA_TO = rs14.getString("RUTA_TO");
                                                                        objRtn14.fileA2033.CARR = rs14.getString("CARR");
                                                                        objRtn14.fileA2033.DFLIGHT = rs14.getString("DFLIGHT");
                                                                        objRtn14.fileA2033.NFLIGHT = rs14.getString("NFLIGHT");
                                                                        objRtn14.fileA2033.FBASIS = rs14.getString("FBASIS");
                                                                        objRtn14.fileA2033.GROSS = rs14.getDouble("GROSS");
                                                                        objRtn14.fileA2033.CURRENC = rs14.getString("CURRENC");
                                                                        objRtn14.fileA2033.TRNC = rs14.getString("TRNC");
                                                                        objRtn14.fileA2033.TTRAX = rs14.getInt("TTRAX");
                                                                        objRtn14.fileA2033.CORRL = rs14.getInt("CORRL");
                                                                        objRtn14.fileA2033.ESTADO = rs14.getString("ESTADO");
                                                                        objRtn14.fileA2033.TTRANS = rs14.getInt("TTRANS");
                                                                        objRtn14.fileA2033.ESTTRX = rs14.getString("ESTTRX");
                                                                        objRtn14.fileA2033.AMOUNTLOC = rs14.getDouble("AMOUNTLOC");
                                                                        filter.lstResultSet14.add(objRtn14);
                                                                    }
                                                                    if (cstmt01.getMoreResults()) {
                                                                        rs15 = cstmt01.getResultSet();
                                                                        while (rs15.next()) {
                                                                            objRtn15 = new PX040S01A720ResultSet15();
                                                                            objRtn15.fileA1747.SEQ = rs15.getString("SEQ");
                                                                            objRtn15.fileA1747.CCIA = rs15.getString("CCIA");
                                                                            objRtn15.fileA1747.FORMA = rs15.getString("FORMA");
                                                                            objRtn15.fileA1747.SERIE = rs15.getString("SERIE");
                                                                            objRtn15.fileA1747.CUPON = rs15.getString("CUPON");
                                                                            objRtn15.fileA1747.CDEPART = rs15.getString("CDEPART");
                                                                            objRtn15.fileA1747.CARRIVA = rs15.getString("CARRIVA");
                                                                            objRtn15.fileA1747.CARR = rs15.getString("CARR");
                                                                            objRtn15.fileA1747.NFLIGHT = rs15.getString("NFLIGHT");
                                                                            objRtn15.fileA1747.DFLIGHT = rs15.getString("DFLIGHT");
                                                                            objRtn15.fileA1747.CLAS = rs15.getString("CLAS");
                                                                            objRtn15.fileA1747.FBASE = rs15.getString("FBASE");
                                                                            objRtn15.fileA1747.VCPN = rs15.getDouble("VCPN");
                                                                            objRtn15.fileA1747.MDACP = rs15.getString("MDACP");
                                                                            filter.lstResultSet15.add(objRtn15);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //</editor-fold>
            }
        } finally {
            //<editor-fold defaultstate="collapsed" desc="{...} Finally">
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs02 != null) {
                rs02.close();
            }
            if (rs03 != null) {
                rs03.close();
            }
            if (rs04 != null) {
                rs04.close();
            }
            if (rs05 != null) {
                rs05.close();
            }
            if (rs06 != null) {
                rs06.close();
            }
            if (rs07 != null) {
                rs07.close();
            }
            if (rs08 != null) {
                rs08.close();
            }
            if (rs09 != null) {
                rs09.close();
            }
            if (rs10 != null) {
                rs10.close();
            }
            if (rs11 != null) {
                rs11.close();
            }
            if (rs13 != null) {
                rs13.close();
            }
            if (rs14 != null) {
                rs14.close();
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
            //</editor-fold>
        }
        return filter;
    }
    
    public PX040S01A720Filter loadPX040S01MPF123(PX040S01A720Filter filter) throws SQLException, Exception {

        String strMsj = "FAILED";
        PX040S01A720Filter objRtn = new PX040S01A720Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPS01MPF123(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CIA.trim());
            cstmt01.setString(3, filter.IN_FORMA.trim());
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.registerOutParameter(5, Types.VARCHAR);

            cstmt01.execute();
            strMsj = cstmt01.getString(5);
            objRtn.MESSAGE = strMsj;
            
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
//        objRtn.MESSAGE = strMsj;
        return objRtn;
    }
    
    @Deprecated
    public List<PX040S01A720Filter> SQP04422(PX040S01A720Filter filter) throws SQLException, Exception {
        PX040S01A720ResultSet01 objRtn;
        PX040S01A720Filter pX040S01A720Filter = new PX040S01A720Filter();
        List<PX040S01A720Filter> lstPX040S01A720Filter = new ArrayList<PX040S01A720Filter>();
        PreparedStatement pstmt01 = null, pstmt02 = null;
        ResultSet rstst01 = null, rstst02 = null;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null, rs05 = null, rs06 = null, rs07 = null, rs08 = null, rs09 = null, rs10 = null, rs11 = null, rs12 = null, rs13 = null, rs14 = null, rs15 = null;
        String SQLQRY01 = "SELECT";

        //<editor-fold defaultstate="collapsed" desc="{...} SQL Sentences">
        if(filter.IN_CIA.equals("134"))
        {
            SQLQRY01 = "SELECT"
                + "   A720CIA,A720FORMA,A720SERIE, A720SEQ "
                + " FROM PRAXIS.A720 WHERE"
                + "   A720AIRLIN=? AND A720CIA=? AND A720FORMA=? AND A720SERIE=?"
                + " UNION"
                + " SELECT  A720CIA,A720FORMA,A720SERIE, A720SEQ "
                + " FROM PRAXIS.A720HST WHERE"
                + "   A720AIRLIN=? AND A720CIA=? AND A720FORMA=? AND A720SERIE=?";
        }
        else
        {
            SQLQRY01 = "SELECT"
                + "   A720CIA,A720FORMA,A720SERIE, A720SEQ "
                + " FROM PRAXIS.A3200 WHERE"
                + "   A720AIRLIN=? AND A720CIA=? AND A720FORMA=? AND A720SERIE=?";
        }
        //</editor-fold>
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            if(filter.IN_CIA.equals("134")){
                pstmt01 = cnx.prepareStatement(SQLQRY01);
                pstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                pstmt01.setString(2, filter.IN_CIA);
                pstmt01.setString(3, filter.IN_FORMA);
                pstmt01.setString(4, filter.IN_SERIE);
                pstmt01.setString(5, session.getUserView().getCustomerInfo().CCUST);
                pstmt01.setString(6, filter.IN_CIA);
                pstmt01.setString(7, filter.IN_FORMA);
                pstmt01.setString(8, filter.IN_SERIE);
                rstst01 = pstmt01.executeQuery();
                while(rstst01.next()){
                    pX040S01A720Filter = new PX040S01A720Filter();
                    pX040S01A720Filter.IN_CIA = rstst01.getString("A720CIA");
                    pX040S01A720Filter.IN_FORMA = rstst01.getString("A720FORMA");
                    pX040S01A720Filter.IN_SERIE = rstst01.getString("A720SERIE");
                    pX040S01A720Filter.IN_SEQ = rstst01.getString("A720SEQ");
                    lstPX040S01A720Filter.add(pX040S01A720Filter);
                }                
            }
            else
            {
                pstmt01 = cnx.prepareStatement(SQLQRY01);
                pstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                pstmt01.setString(2, filter.IN_CIA);
                pstmt01.setString(3, filter.IN_FORMA);
                pstmt01.setString(4, filter.IN_SERIE);
                rstst01 = pstmt01.executeQuery();
                while(rstst01.next()){
                    pX040S01A720Filter = new PX040S01A720Filter();
                    pX040S01A720Filter.IN_CIA = rstst01.getString("A720CIA");
                    pX040S01A720Filter.IN_FORMA = rstst01.getString("A720FORMA");
                    pX040S01A720Filter.IN_SERIE = rstst01.getString("A720SERIE");
                    pX040S01A720Filter.IN_SEQ = rstst01.getString("A720SEQ");
                    lstPX040S01A720Filter.add(pX040S01A720Filter);
                }
            }
            
        } finally {
            
        }
        return lstPX040S01A720Filter;
    }
    
    
    @Deprecated
    public List<PX040S01A1716Filter> loadPX040S01A1716(PX040S01A1716Filter filter) throws SQLException, Exception {
        List<PX040S01A1716Filter> lstRtn = new ArrayList<PX040S01A1716Filter>(0);
        PX040S01A1716Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null, rs05 = null, rs06 = null, rs07 = null, rs08 = null, rs09 = null, rs10 = null, rs11 = null, rs12 = null, rs13 = null, rs14 = null, rs15 = null;

        String SQLCLL01 = "{CALL SQP04220(?,?,?,?,?,?,?,?,?)}"; // CAMBIAMOS SP PRAXIS.PX040S01A1716
        //String SQLCLL01 = "{CALL PRAXIS.SQP00362(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_A1716CCUST);
            cstmt01.setString(2, filter.VP_A1716CIA);
            cstmt01.setString(3, filter.VP_A1716FORMA);
            cstmt01.setString(4, filter.VP_A1716SERIE);
            cstmt01.setString(5, filter.VP_A1716SEQT);
//            
            cstmt01.setString(6, filter.VP_A1716SEQR);
            cstmt01.setString(7, filter.VP_A1716SEQF);
            cstmt01.setString(8, filter.VP_A1716SEQI);
            cstmt01.setString(9, filter.VP_A1716SEQA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX040S01A1716Filter();
                objRtn.A1716CCUST = rs01.getString("A1716CCUST");
                objRtn.A1716CIA = rs01.getString("A1716CIA");
                objRtn.A1716FORMA = rs01.getString("A1716FORMA");
                objRtn.A1716SERIE = rs01.getString("A1716SERIE");
                objRtn.A1716CUPON = rs01.getString("A1716CUPON");
                objRtn.A1716SEQT = rs01.getString("A1716SEQT");
                objRtn.A1716SEQ = rs01.getString("A1716SEQ");

                objRtn.A1716MODO = rs01.getString("A1716MODO");
                objRtn.A1716FUENT = rs01.getString("A1716FUENT");
                objRtn.A1716SUBFU = rs01.getString("A1716SUBFU");
                objRtn.A1716FP = rs01.getString("A1716FP");

                objRtn.A1716FUENT = rs01.getString("A1716FUENT");
                objRtn.A1716ESTAD = rs01.getString("A1716ESTAD");
                objRtn.A1716FFILE = rs01.getString("A1716FFILE");
                objRtn.A1716FPRO = rs01.getString("A1716FPRO");
                objRtn.A1716GRUPO = rs01.getString("A1716GRUPO");
                objRtn.A1716CUR = rs01.getString("A1716CUR");
                objRtn.A1716ACTIV = rs01.getDouble("A1716ACTIV");
                objRtn.A1716PASIV = rs01.getDouble("A1716PASIV");
                objRtn.A1716CURRV = rs01.getString("A1716CURRV");
                objRtn.A1716ACTRV = rs01.getDouble("A1716ACTRV");
                objRtn.A1716PASRV = rs01.getDouble("A1716PASRV");
                objRtn.A1716CUENT = rs01.getString("A1716CUENT");
                objRtn.A1716SUBCU = rs01.getString("A1716SUBCU");
                objRtn.A1716IDFIL = rs01.getString("A1716IDFIL");
                objRtn.A1716TIDOC = rs01.getString("A1716TIDOC");
                objRtn.A1716ORIG = rs01.getString("A1716ORIG");
                objRtn.A1716FCONT = rs01.getString("A1716FCONT");

                objRtn.A1716TITU = rs01.getString("A1716TITU");

                objRtn.A1716COPE = rs01.getString("A1716COPE");
                objRtn.A1716PROV = rs01.getString("A1716PROV");

                objRtn.A1716IDCON = rs01.getString("A1716IDCON");

                objRtn.TCOL = rs01.getString("TCOL");
                /*
                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
                    
                 }
                 */
                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                }

                lstRtn.add(objRtn);
            }
            //<editor-fold defaultstate="collapsed" desc="{...}">
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new PX040S01A1716Filter();
                    objRtn.A1716CCUST = rs02.getString("A1716CCUST");
                    objRtn.A1716CIA = rs02.getString("A1716CIA");
                    objRtn.A1716FORMA = rs02.getString("A1716FORMA");
                    objRtn.A1716SERIE = rs02.getString("A1716SERIE");
                    objRtn.A1716CUPON = rs02.getString("A1716CUPON");
                    objRtn.A1716SEQT = rs02.getString("A1716SEQT");
                    objRtn.A1716SEQ = rs02.getString("A1716SEQ");

                    objRtn.A1716MODO = rs02.getString("A1716MODO");
                    objRtn.A1716FUENT = rs02.getString("A1716FUENT");
                    objRtn.A1716SUBFU = rs02.getString("A1716SUBFU");
                    objRtn.A1716FP = rs02.getString("A1716FP");

                    objRtn.A1716FUENT = rs02.getString("A1716FUENT");
                    objRtn.A1716ESTAD = rs02.getString("A1716ESTAD");
                    objRtn.A1716FFILE = rs02.getString("A1716FFILE");
                    objRtn.A1716FPRO = rs02.getString("A1716FPRO");
                    objRtn.A1716GRUPO = rs02.getString("A1716GRUPO");
                    objRtn.A1716CUR = rs02.getString("A1716CUR");
                    objRtn.A1716ACTIV = rs02.getDouble("A1716ACTIV");
                    objRtn.A1716PASIV = rs02.getDouble("A1716PASIV");
                    objRtn.A1716CURRV = rs02.getString("A1716CURRV");
                    objRtn.A1716ACTRV = rs02.getDouble("A1716ACTRV");
                    objRtn.A1716PASRV = rs02.getDouble("A1716PASRV");
                    objRtn.A1716CUENT = rs02.getString("A1716CUENT");
                    objRtn.A1716SUBCU = rs02.getString("A1716SUBCU");
                    objRtn.A1716IDFIL = rs02.getString("A1716IDFIL");
                    objRtn.A1716TIDOC = rs02.getString("A1716TIDOC");
                    objRtn.A1716ORIG = rs02.getString("A1716ORIG");
                    objRtn.A1716FCONT = rs02.getString("A1716FCONT");

                    objRtn.A1716TITU = rs02.getString("A1716TITU");

                    objRtn.A1716COPE = rs02.getString("A1716COPE");
                    objRtn.A1716PROV = rs02.getString("A1716PROV");

                    objRtn.A1716IDCON = rs02.getString("A1716IDCON");

                    objRtn.TCOL = rs02.getString("TCOL");
//                    
//                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                     }
//                    
                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                    }

                    lstRtn.add(objRtn);
                }
                if (cstmt01.getMoreResults()) {
                    rs03 = cstmt01.getResultSet();
                    while (rs03.next()) {
                        objRtn = new PX040S01A1716Filter();
                        objRtn.A1716CCUST = rs03.getString("A1716CCUST");
                        objRtn.A1716CIA = rs03.getString("A1716CIA");
                        objRtn.A1716FORMA = rs03.getString("A1716FORMA");
                        objRtn.A1716SERIE = rs03.getString("A1716SERIE");
                        objRtn.A1716CUPON = rs03.getString("A1716CUPON");
                        objRtn.A1716SEQT = rs03.getString("A1716SEQT");
                        objRtn.A1716SEQ = rs03.getString("A1716SEQ");

                        objRtn.A1716MODO = rs03.getString("A1716MODO");
                        objRtn.A1716FUENT = rs03.getString("A1716FUENT");
                        objRtn.A1716SUBFU = rs03.getString("A1716SUBFU");
                        objRtn.A1716FP = rs03.getString("A1716FP");

                        objRtn.A1716FUENT = rs03.getString("A1716FUENT");
                        objRtn.A1716ESTAD = rs03.getString("A1716ESTAD");
                        objRtn.A1716FFILE = rs03.getString("A1716FFILE");
                        objRtn.A1716FPRO = rs03.getString("A1716FPRO");
                        objRtn.A1716GRUPO = rs03.getString("A1716GRUPO");
                        objRtn.A1716CUR = rs03.getString("A1716CUR");
                        objRtn.A1716ACTIV = rs03.getDouble("A1716ACTIV");
                        objRtn.A1716PASIV = rs03.getDouble("A1716PASIV");
                        objRtn.A1716CURRV = rs03.getString("A1716CURRV");
                        objRtn.A1716ACTRV = rs03.getDouble("A1716ACTRV");
                        objRtn.A1716PASRV = rs03.getDouble("A1716PASRV");
                        objRtn.A1716CUENT = rs03.getString("A1716CUENT");
                        objRtn.A1716SUBCU = rs03.getString("A1716SUBCU");
                        objRtn.A1716IDFIL = rs03.getString("A1716IDFIL");
                        objRtn.A1716TIDOC = rs03.getString("A1716TIDOC");
                        objRtn.A1716ORIG = rs03.getString("A1716ORIG");
                        objRtn.A1716FCONT = rs03.getString("A1716FCONT");

                        objRtn.A1716TITU = rs03.getString("A1716TITU");

                        objRtn.A1716COPE = rs03.getString("A1716COPE");
                        objRtn.A1716PROV = rs03.getString("A1716PROV");

                        objRtn.A1716IDCON = rs03.getString("A1716IDCON");

                        objRtn.TCOL = rs03.getString("TCOL");
//                        
//                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                         }
//                        
                        if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                            objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                        }

                        lstRtn.add(objRtn);
                    }
                    if (cstmt01.getMoreResults()) {
                        rs04 = cstmt01.getResultSet();
                        while (rs04.next()) {
                            objRtn = new PX040S01A1716Filter();
                            objRtn.A1716CCUST = rs04.getString("A1716CCUST");
                            objRtn.A1716CIA = rs04.getString("A1716CIA");
                            objRtn.A1716FORMA = rs04.getString("A1716FORMA");
                            objRtn.A1716CUPON = rs04.getString("A1716CUPON");
                            objRtn.A1716SERIE = rs04.getString("A1716SERIE");
                            objRtn.A1716SEQT = rs04.getString("A1716SEQT");
                            objRtn.A1716SEQ = rs04.getString("A1716SEQ");

                            objRtn.A1716MODO = rs04.getString("A1716MODO");
                            objRtn.A1716FUENT = rs04.getString("A1716FUENT");
                            objRtn.A1716SUBFU = rs04.getString("A1716SUBFU");
                            objRtn.A1716FP = rs04.getString("A1716FP");

                            objRtn.A1716FUENT = rs04.getString("A1716FUENT");
                            objRtn.A1716ESTAD = rs04.getString("A1716ESTAD");
                            objRtn.A1716FFILE = rs04.getString("A1716FFILE");
                            objRtn.A1716FPRO = rs04.getString("A1716FPRO");
                            objRtn.A1716GRUPO = rs04.getString("A1716GRUPO");
                            objRtn.A1716CUR = rs04.getString("A1716CUR");
                            objRtn.A1716ACTIV = rs04.getDouble("A1716ACTIV");
                            objRtn.A1716PASIV = rs04.getDouble("A1716PASIV");
                            objRtn.A1716CURRV = rs04.getString("A1716CURRV");
                            objRtn.A1716ACTRV = rs04.getDouble("A1716ACTRV");
                            objRtn.A1716PASRV = rs04.getDouble("A1716PASRV");
                            objRtn.A1716CUENT = rs04.getString("A1716CUENT");
                            objRtn.A1716SUBCU = rs04.getString("A1716SUBCU");
                            objRtn.A1716IDFIL = rs04.getString("A1716IDFIL");
                            objRtn.A1716TIDOC = rs04.getString("A1716TIDOC");
                            objRtn.A1716ORIG = rs04.getString("A1716ORIG");
                            objRtn.A1716FCONT = rs04.getString("A1716FCONT");

                            objRtn.A1716TITU = rs04.getString("A1716TITU");

                            objRtn.A1716COPE = rs04.getString("A1716COPE");
                            objRtn.A1716PROV = rs04.getString("A1716PROV");

                            objRtn.A1716IDCON = rs04.getString("A1716IDCON");

                            objRtn.TCOL = rs04.getString("TCOL");
//                            
//                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                             }
//                            
                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                            }

                            lstRtn.add(objRtn);
                        }
                        if (cstmt01.getMoreResults()) {
                            rs05 = cstmt01.getResultSet();
                            while (rs05.next()) {
                                objRtn = new PX040S01A1716Filter();
                                objRtn.A1716CCUST = rs05.getString("A1716CCUST");
                                objRtn.A1716CIA = rs05.getString("A1716CIA");
                                objRtn.A1716FORMA = rs05.getString("A1716FORMA");
                                objRtn.A1716SERIE = rs05.getString("A1716SERIE");
                                objRtn.A1716CUPON = rs05.getString("A1716CUPON");
                                objRtn.A1716SEQT = rs05.getString("A1716SEQT");
                                objRtn.A1716SEQ = rs05.getString("A1716SEQ");

                                objRtn.A1716MODO = rs05.getString("A1716MODO");
                                objRtn.A1716FUENT = rs05.getString("A1716FUENT");
                                objRtn.A1716SUBFU = rs05.getString("A1716SUBFU");
                                objRtn.A1716FP = rs05.getString("A1716FP");

                                objRtn.A1716FUENT = rs05.getString("A1716FUENT");
                                objRtn.A1716ESTAD = rs05.getString("A1716ESTAD");
                                objRtn.A1716FFILE = rs05.getString("A1716FFILE");
                                objRtn.A1716FPRO = rs05.getString("A1716FPRO");
                                objRtn.A1716GRUPO = rs05.getString("A1716GRUPO");
                                objRtn.A1716CUR = rs05.getString("A1716CUR");
                                objRtn.A1716ACTIV = rs05.getDouble("A1716ACTIV");
                                objRtn.A1716PASIV = rs05.getDouble("A1716PASIV");
                                objRtn.A1716CURRV = rs05.getString("A1716CURRV");
                                objRtn.A1716ACTRV = rs05.getDouble("A1716ACTRV");
                                objRtn.A1716PASRV = rs05.getDouble("A1716PASRV");
                                objRtn.A1716CUENT = rs05.getString("A1716CUENT");
                                objRtn.A1716SUBCU = rs05.getString("A1716SUBCU");
                                objRtn.A1716IDFIL = rs05.getString("A1716IDFIL");
                                objRtn.A1716TIDOC = rs05.getString("A1716TIDOC");
                                objRtn.A1716ORIG = rs05.getString("A1716ORIG");
                                objRtn.A1716FCONT = rs05.getString("A1716FCONT");

                                objRtn.A1716TITU = rs05.getString("A1716TITU");

                                objRtn.A1716COPE = rs05.getString("A1716COPE");
                                objRtn.A1716PROV = rs05.getString("A1716PROV");

                                objRtn.A1716IDCON = rs05.getString("A1716IDCON");

                                objRtn.TCOL = rs05.getString("TCOL");
//                                
//                                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                 }
//                                
                                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                }

                                lstRtn.add(objRtn);
                            }
                            if (cstmt01.getMoreResults()) {
                                rs06 = cstmt01.getResultSet();
                                while (rs06.next()) {
                                    objRtn = new PX040S01A1716Filter();
                                    objRtn.A1716CCUST = rs06.getString("A1716CCUST");
                                    objRtn.A1716CIA = rs06.getString("A1716CIA");
                                    objRtn.A1716FORMA = rs06.getString("A1716FORMA");
                                    objRtn.A1716SERIE = rs06.getString("A1716SERIE");
                                    objRtn.A1716CUPON = rs06.getString("A1716CUPON");
                                    objRtn.A1716SEQT = rs06.getString("A1716SEQT");
                                    objRtn.A1716SEQ = rs06.getString("A1716SEQ");

                                    objRtn.A1716MODO = rs06.getString("A1716MODO");
                                    objRtn.A1716FUENT = rs06.getString("A1716FUENT");
                                    objRtn.A1716SUBFU = rs06.getString("A1716SUBFU");
                                    objRtn.A1716FP = rs06.getString("A1716FP");

                                    objRtn.A1716FUENT = rs06.getString("A1716FUENT");
                                    objRtn.A1716ESTAD = rs06.getString("A1716ESTAD");
                                    objRtn.A1716FFILE = rs06.getString("A1716FFILE");
                                    objRtn.A1716FPRO = rs06.getString("A1716FPRO");
                                    objRtn.A1716GRUPO = rs06.getString("A1716GRUPO");
                                    objRtn.A1716CUR = rs06.getString("A1716CUR");
                                    objRtn.A1716ACTIV = rs06.getDouble("A1716ACTIV");
                                    objRtn.A1716PASIV = rs06.getDouble("A1716PASIV");
                                    objRtn.A1716CUENT = rs06.getString("A1716CUENT");
                                    objRtn.A1716SUBCU = rs06.getString("A1716SUBCU");
                                    objRtn.A1716IDFIL = rs06.getString("A1716IDFIL");
                                    objRtn.A1716TIDOC = rs06.getString("A1716TIDOC");
                                    objRtn.A1716ORIG = rs06.getString("A1716ORIG");
                                    objRtn.A1716FCONT = rs06.getString("A1716FCONT");

                                    objRtn.A1716TITU = rs06.getString("A1716TITU");

                                    objRtn.A1716COPE = rs06.getString("A1716COPE");
                                    objRtn.A1716PROV = rs06.getString("A1716PROV");

                                    objRtn.A1716IDCON = rs06.getString("A1716IDCON");
                                    objRtn.A1716CURRV = rs06.getString("A1716CURRV");
                                    objRtn.A1716ACTRV = rs06.getDouble("A1716ACTRV");
                                    objRtn.A1716PASRV = rs06.getDouble("A1716PASRV");
                                    objRtn.TCOL = rs06.getString("TCOL");
//                                    
//                                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                     }
//                                    
                                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                    }

                                    lstRtn.add(objRtn);
                                }
                                if (cstmt01.getMoreResults()) {
                                    rs07 = cstmt01.getResultSet();
                                    while (rs07.next()) {
                                        objRtn = new PX040S01A1716Filter();
                                        objRtn.A1716CCUST = rs07.getString("A1716CCUST");
                                        objRtn.A1716CIA = rs07.getString("A1716CIA");
                                        objRtn.A1716FORMA = rs07.getString("A1716FORMA");
                                        objRtn.A1716SERIE = rs07.getString("A1716SERIE");
                                        objRtn.A1716CUPON = rs07.getString("A1716CUPON");
                                        objRtn.A1716SEQT = rs07.getString("A1716SEQT");
                                        objRtn.A1716SEQ = rs07.getString("A1716SEQ");

                                        objRtn.A1716MODO = rs07.getString("A1716MODO");
                                        objRtn.A1716FUENT = rs07.getString("A1716FUENT");
                                        objRtn.A1716SUBFU = rs07.getString("A1716SUBFU");
                                        objRtn.A1716FP = rs07.getString("A1716FP");

                                        objRtn.A1716FUENT = rs07.getString("A1716FUENT");
                                        objRtn.A1716ESTAD = rs07.getString("A1716ESTAD");
                                        objRtn.A1716FFILE = rs07.getString("A1716FFILE");
                                        objRtn.A1716FPRO = rs07.getString("A1716FPRO");
                                        objRtn.A1716GRUPO = rs07.getString("A1716GRUPO");
                                        objRtn.A1716CUR = rs07.getString("A1716CUR");
                                        objRtn.A1716ACTIV = rs07.getDouble("A1716ACTIV");
                                        objRtn.A1716PASIV = rs07.getDouble("A1716PASIV");
                                        objRtn.A1716CURRV = rs07.getString("A1716CURRV");
                                        objRtn.A1716ACTRV = rs07.getDouble("A1716ACTRV");
                                        objRtn.A1716PASRV = rs07.getDouble("A1716PASRV");
                                        objRtn.A1716CUENT = rs07.getString("A1716CUENT");
                                        objRtn.A1716SUBCU = rs07.getString("A1716SUBCU");
                                        objRtn.A1716IDFIL = rs07.getString("A1716IDFIL");
                                        objRtn.A1716TIDOC = rs07.getString("A1716TIDOC");
                                        objRtn.A1716ORIG = rs07.getString("A1716ORIG");
                                        objRtn.A1716FCONT = rs07.getString("A1716FCONT");

                                        objRtn.A1716TITU = rs07.getString("A1716TITU");

                                        objRtn.A1716COPE = rs07.getString("A1716COPE");
                                        objRtn.A1716PROV = rs07.getString("A1716PROV");

                                        objRtn.A1716IDCON = rs07.getString("A1716IDCON");

                                        objRtn.TCOL = rs07.getString("TCOL");
//                                        
//                                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                         }
//                                        
                                        if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                            objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                        }

                                        lstRtn.add(objRtn);
                                    }
                                    if (cstmt01.getMoreResults()) {
                                        rs08 = cstmt01.getResultSet();
                                        while (rs08.next()) {
                                            objRtn = new PX040S01A1716Filter();
                                            objRtn.A1716CCUST = rs08.getString("A1716CCUST");
                                            objRtn.A1716CIA = rs08.getString("A1716CIA");
                                            objRtn.A1716FORMA = rs08.getString("A1716FORMA");
                                            objRtn.A1716SERIE = rs08.getString("A1716SERIE");
                                            objRtn.A1716CUPON = rs08.getString("A1716CUPON");
                                            objRtn.A1716SEQT = rs08.getString("A1716SEQT");
                                            objRtn.A1716SEQ = rs08.getString("A1716SEQ");

                                            objRtn.A1716MODO = rs08.getString("A1716MODO");
                                            objRtn.A1716FUENT = rs08.getString("A1716FUENT");
                                            objRtn.A1716SUBFU = rs08.getString("A1716SUBFU");
                                            objRtn.A1716FP = rs08.getString("A1716FP");

                                            objRtn.A1716FUENT = rs08.getString("A1716FUENT");
                                            objRtn.A1716ESTAD = rs08.getString("A1716ESTAD");
                                            objRtn.A1716FFILE = rs08.getString("A1716FFILE");
                                            objRtn.A1716FPRO = rs08.getString("A1716FPRO");
                                            objRtn.A1716GRUPO = rs08.getString("A1716GRUPO");
                                            objRtn.A1716CUR = rs08.getString("A1716CUR");
                                            objRtn.A1716ACTIV = rs08.getDouble("A1716ACTIV");
                                            objRtn.A1716PASIV = rs08.getDouble("A1716PASIV");
                                            objRtn.A1716CUENT = rs08.getString("A1716CUENT");
                                            objRtn.A1716SUBCU = rs08.getString("A1716SUBCU");
                                            objRtn.A1716IDFIL = rs08.getString("A1716IDFIL");
                                            objRtn.A1716TIDOC = rs08.getString("A1716TIDOC");
                                            objRtn.A1716ORIG = rs08.getString("A1716ORIG");
                                            objRtn.A1716FCONT = rs08.getString("A1716FCONT");
                                            objRtn.A1716CURRV = rs08.getString("A1716CURRV");
                                            objRtn.A1716ACTRV = rs08.getDouble("A1716ACTRV");
                                            objRtn.A1716PASRV = rs08.getDouble("A1716PASRV");

                                            objRtn.A1716TITU = rs08.getString("A1716TITU");

                                            objRtn.A1716COPE = rs08.getString("A1716COPE");
                                            objRtn.A1716PROV = rs08.getString("A1716PROV");

                                            objRtn.A1716IDCON = rs08.getString("A1716IDCON");

                                            objRtn.TCOL = rs08.getString("TCOL");
//                                            
//                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                             }
//                                            
                                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                            }

                                            lstRtn.add(objRtn);
                                        }
                                        if (cstmt01.getMoreResults()) {
                                            rs09 = cstmt01.getResultSet();
                                            while (rs09.next()) {
                                                objRtn = new PX040S01A1716Filter();
                                                objRtn.A1716CCUST = rs09.getString("A1716CCUST");
                                                objRtn.A1716CIA = rs09.getString("A1716CIA");
                                                objRtn.A1716FORMA = rs09.getString("A1716FORMA");
                                                objRtn.A1716SERIE = rs09.getString("A1716SERIE");
                                                objRtn.A1716CUPON = rs09.getString("A1716CUPON");
                                                objRtn.A1716SEQT = rs09.getString("A1716SEQT");
                                                objRtn.A1716SEQ = rs09.getString("A1716SEQ");

                                                objRtn.A1716MODO = rs09.getString("A1716MODO");
                                                objRtn.A1716FUENT = rs09.getString("A1716FUENT");
                                                objRtn.A1716SUBFU = rs09.getString("A1716SUBFU");
                                                objRtn.A1716FP = rs09.getString("A1716FP");

                                                objRtn.A1716FUENT = rs09.getString("A1716FUENT");
                                                objRtn.A1716ESTAD = rs09.getString("A1716ESTAD");
                                                objRtn.A1716FFILE = rs09.getString("A1716FFILE");
                                                objRtn.A1716FPRO = rs09.getString("A1716FPRO");
                                                objRtn.A1716GRUPO = rs09.getString("A1716GRUPO");
                                                objRtn.A1716CUR = rs09.getString("A1716CUR");
                                                objRtn.A1716ACTIV = rs09.getDouble("A1716ACTIV");
                                                objRtn.A1716PASIV = rs09.getDouble("A1716PASIV");
                                                objRtn.A1716CUENT = rs09.getString("A1716CUENT");
                                                objRtn.A1716SUBCU = rs09.getString("A1716SUBCU");
                                                objRtn.A1716IDFIL = rs09.getString("A1716IDFIL");
                                                objRtn.A1716TIDOC = rs09.getString("A1716TIDOC");
                                                objRtn.A1716ORIG = rs09.getString("A1716ORIG");
                                                objRtn.A1716FCONT = rs09.getString("A1716FCONT");

                                                objRtn.A1716TITU = rs09.getString("A1716TITU");

                                                objRtn.A1716COPE = rs09.getString("A1716COPE");
                                                objRtn.A1716PROV = rs09.getString("A1716PROV");

                                                objRtn.A1716IDCON = rs09.getString("A1716IDCON");

                                                objRtn.TCOL = rs09.getString("TCOL");
//                                                
//                                                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                 }
//                                                
                                                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                }

                                                lstRtn.add(objRtn);
                                            }
                                            if (cstmt01.getMoreResults()) {
                                                rs10 = cstmt01.getResultSet();
                                                while (rs10.next()) {
                                                    objRtn = new PX040S01A1716Filter();
                                                    objRtn.A1716CCUST = rs10.getString("A1716CCUST");
                                                    objRtn.A1716CIA = rs10.getString("A1716CIA");
                                                    objRtn.A1716FORMA = rs10.getString("A1716FORMA");
                                                    objRtn.A1716SERIE = rs10.getString("A1716SERIE");
                                                    objRtn.A1716CUPON = rs10.getString("A1716CUPON");
                                                    objRtn.A1716SEQT = rs10.getString("A1716SEQT");
                                                    objRtn.A1716SEQ = rs10.getString("A1716SEQ");

                                                    objRtn.A1716MODO = rs10.getString("A1716MODO");
                                                    objRtn.A1716FUENT = rs10.getString("A1716FUENT");
                                                    objRtn.A1716SUBFU = rs10.getString("A1716SUBFU");
                                                    objRtn.A1716FP = rs10.getString("A1716FP");

                                                    objRtn.A1716FUENT = rs10.getString("A1716FUENT");
                                                    objRtn.A1716ESTAD = rs10.getString("A1716ESTAD");
                                                    objRtn.A1716FFILE = rs10.getString("A1716FFILE");
                                                    objRtn.A1716FPRO = rs10.getString("A1716FPRO");
                                                    objRtn.A1716GRUPO = rs10.getString("A1716GRUPO");
                                                    objRtn.A1716CUR = rs10.getString("A1716CUR");
                                                    objRtn.A1716ACTIV = rs10.getDouble("A1716ACTIV");
                                                    objRtn.A1716PASIV = rs10.getDouble("A1716PASIV");
                                                    objRtn.A1716CUENT = rs10.getString("A1716CUENT");
                                                    objRtn.A1716SUBCU = rs10.getString("A1716SUBCU");
                                                    objRtn.A1716IDFIL = rs10.getString("A1716IDFIL");
                                                    objRtn.A1716TIDOC = rs10.getString("A1716TIDOC");
                                                    objRtn.A1716ORIG = rs10.getString("A1716ORIG");
                                                    objRtn.A1716FCONT = rs10.getString("A1716FCONT");

                                                    objRtn.A1716TITU = rs10.getString("A1716TITU");

                                                    objRtn.A1716COPE = rs10.getString("A1716COPE");
                                                    objRtn.A1716PROV = rs10.getString("A1716PROV");

                                                    objRtn.A1716IDCON = rs10.getString("A1716IDCON");

                                                    objRtn.TCOL = rs10.getString("TCOL");
//                                                    
//                                                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                     }
//                                                    
                                                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                    }

                                                    lstRtn.add(objRtn);
                                                }
                                                if (cstmt01.getMoreResults()) {
                                                    rs11 = cstmt01.getResultSet();
                                                    while (rs11.next()) {
                                                        objRtn = new PX040S01A1716Filter();
                                                        objRtn.A1716CCUST = rs11.getString("A1716CCUST");
                                                        objRtn.A1716CIA = rs11.getString("A1716CIA");
                                                        objRtn.A1716FORMA = rs11.getString("A1716FORMA");
                                                        objRtn.A1716SERIE = rs11.getString("A1716SERIE");
                                                        objRtn.A1716CUPON = rs11.getString("A1716CUPON");
                                                        objRtn.A1716SEQT = rs11.getString("A1716SEQT");
                                                        objRtn.A1716SEQ = rs11.getString("A1716SEQ");

                                                        objRtn.A1716MODO = rs11.getString("A1716MODO");
                                                        objRtn.A1716FUENT = rs11.getString("A1716FUENT");
                                                        objRtn.A1716SUBFU = rs11.getString("A1716SUBFU");
                                                        objRtn.A1716FP = rs11.getString("A1716FP");

                                                        objRtn.A1716FUENT = rs11.getString("A1716FUENT");
                                                        objRtn.A1716ESTAD = rs11.getString("A1716ESTAD");
                                                        objRtn.A1716FFILE = rs11.getString("A1716FFILE");
                                                        objRtn.A1716FPRO = rs11.getString("A1716FPRO");
                                                        objRtn.A1716GRUPO = rs11.getString("A1716GRUPO");
                                                        objRtn.A1716CUR = rs11.getString("A1716CUR");
                                                        objRtn.A1716ACTIV = rs11.getDouble("A1716ACTIV");
                                                        objRtn.A1716PASIV = rs11.getDouble("A1716PASIV");
                                                        objRtn.A1716CUENT = rs11.getString("A1716CUENT");
                                                        objRtn.A1716SUBCU = rs11.getString("A1716SUBCU");
                                                        objRtn.A1716IDFIL = rs11.getString("A1716IDFIL");
                                                        objRtn.A1716TIDOC = rs11.getString("A1716TIDOC");
                                                        objRtn.A1716ORIG = rs11.getString("A1716ORIG");
                                                        objRtn.A1716FCONT = rs11.getString("A1716FCONT");

                                                        objRtn.A1716TITU = rs11.getString("A1716TITU");

                                                        objRtn.A1716COPE = rs11.getString("A1716COPE");
                                                        objRtn.A1716PROV = rs11.getString("A1716PROV");

                                                        objRtn.A1716IDCON = rs11.getString("A1716IDCON");

                                                        objRtn.TCOL = rs11.getString("TCOL");
//                                                        
//                                                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                         }
//                                                        
                                                        if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                            objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                        }

                                                        lstRtn.add(objRtn);
                                                    }
                                                    if (cstmt01.getMoreResults()) {
                                                        rs12 = cstmt01.getResultSet();
                                                        while (rs12.next()) {
                                                            objRtn = new PX040S01A1716Filter();
                                                            objRtn.A1716CCUST = rs12.getString("A1716CCUST");
                                                            objRtn.A1716CIA = rs12.getString("A1716CIA");
                                                            objRtn.A1716FORMA = rs12.getString("A1716FORMA");
                                                            objRtn.A1716SERIE = rs12.getString("A1716SERIE");
                                                            objRtn.A1716CUPON = rs12.getString("A1716CUPON");
                                                            objRtn.A1716SEQT = rs12.getString("A1716SEQT");
                                                            objRtn.A1716SEQ = rs12.getString("A1716SEQ");

                                                            objRtn.A1716MODO = rs12.getString("A1716MODO");
                                                            objRtn.A1716FUENT = rs12.getString("A1716FUENT");
                                                            objRtn.A1716SUBFU = rs12.getString("A1716SUBFU");
                                                            objRtn.A1716FP = rs12.getString("A1716FP");

                                                            objRtn.A1716FUENT = rs12.getString("A1716FUENT");
                                                            objRtn.A1716ESTAD = rs12.getString("A1716ESTAD");
                                                            objRtn.A1716FFILE = rs12.getString("A1716FFILE");
                                                            objRtn.A1716FPRO = rs12.getString("A1716FPRO");
                                                            objRtn.A1716GRUPO = rs12.getString("A1716GRUPO");
                                                            objRtn.A1716CUR = rs12.getString("A1716CUR");
                                                            objRtn.A1716ACTIV = rs12.getDouble("A1716ACTIV");
                                                            objRtn.A1716PASIV = rs12.getDouble("A1716PASIV");
                                                            objRtn.A1716CUENT = rs12.getString("A1716CUENT");
                                                            objRtn.A1716SUBCU = rs12.getString("A1716SUBCU");
                                                            objRtn.A1716IDFIL = rs12.getString("A1716IDFIL");
                                                            objRtn.A1716TIDOC = rs12.getString("A1716TIDOC");
                                                            objRtn.A1716ORIG = rs12.getString("A1716ORIG");
                                                            objRtn.A1716FCONT = rs12.getString("A1716FCONT");

                                                            objRtn.A1716TITU = rs12.getString("A1716TITU");

                                                            objRtn.A1716COPE = rs12.getString("A1716COPE");
                                                            objRtn.A1716PROV = rs12.getString("A1716PROV");

                                                            objRtn.A1716IDCON = rs12.getString("A1716IDCON");

                                                            objRtn.TCOL = rs12.getString("TCOL");
//                                                            
//                                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                             }
//                                                            
                                                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                                objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                            }

                                                            lstRtn.add(objRtn);
                                                        }
                                                        if (cstmt01.getMoreResults()) {
                                                            rs13 = cstmt01.getResultSet();
                                                            while (rs13.next()) {
                                                                objRtn = new PX040S01A1716Filter();
                                                                objRtn.A1716CCUST = rs13.getString("A3875CCUST");
                                                                objRtn.A1716CIA = rs13.getString("A3875CIA");
                                                                objRtn.A1716FORMA = rs13.getString("A3875FORMA");
                                                                objRtn.A1716SERIE = rs13.getString("A3875SERIE");
                                                                objRtn.A1716CUPON = rs13.getString("A3875CUPON");
                                                                objRtn.A1716SEQT = rs13.getString("A3875SEQT");
                                                                objRtn.A1716SEQ = rs13.getString("A3875SEQ");

                                                                objRtn.A1716MODO = rs13.getString("A3875MODO");
                                                                objRtn.A1716FUENT = rs13.getString("A3875FUENT");
                                                                objRtn.A1716SUBFU = rs13.getString("A3875SUBFU");
                                                                objRtn.A1716FP = rs13.getString("A3875FP");

                                                                objRtn.A1716FUENT = rs13.getString("A3875FUENT");
                                                                objRtn.A1716ESTAD = rs13.getString("A3875ESTAD");
                                                                objRtn.A1716FFILE = rs13.getString("A3875FFILE");
                                                                objRtn.A1716FPRO = rs13.getString("A3875FPRO");
                                                                objRtn.A1716GRUPO = rs13.getString("A3875GRUPO");
                                                                objRtn.A1716CUR = rs13.getString("A3875CUR");
                                                                objRtn.A1716ACTIV = rs13.getDouble("A3875ACTIV");
                                                                objRtn.A1716PASIV = rs13.getDouble("A3875PASIV");
                                                                objRtn.A1716CUENT = rs13.getString("A3875CUENT");
                                                                objRtn.A1716SUBCU = rs13.getString("A3875SUBCU");
                                                                objRtn.A1716IDFIL = rs13.getString("A3875IDFIL");
                                                                objRtn.A1716TIDOC = rs13.getString("A3875TIDOC");
                                                                objRtn.A1716ORIG = rs13.getString("A3875ORIG");
                                                                objRtn.A1716FCONT = rs13.getString("A3875FCONT");

                                                                objRtn.A1716TITU = rs13.getString("A3875TITU");

                                                                objRtn.A1716COPE = rs13.getString("A3875COPE");
                                                                objRtn.A1716PROV = rs13.getString("A3875PROV");

                                                                objRtn.A1716IDCON = rs13.getString("A3875IDCON");

                                                                objRtn.TCOL = rs13.getString("TCOL");
    //                                                            
    //                                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
    //
    //                                                             }
    //                                                            
                                                                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                                }

                                                                lstRtn.add(objRtn);
                                                            }
                                                            if (cstmt01.getMoreResults()) {
                                                                rs14 = cstmt01.getResultSet();
                                                                while (rs14.next()) {
                                                                    objRtn = new PX040S01A1716Filter();
                                                                    objRtn.A1716CCUST = rs14.getString("A3875CCUST");
                                                                    objRtn.A1716CIA = rs14.getString("A3875CIA");
                                                                    objRtn.A1716FORMA = rs14.getString("A3875FORMA");
                                                                    objRtn.A1716SERIE = rs14.getString("A3875SERIE");
                                                                    objRtn.A1716CUPON = rs14.getString("A3875CUPON");
                                                                    objRtn.A1716SEQT = rs14.getString("A3875SEQT");
                                                                    objRtn.A1716SEQ = rs14.getString("A3875SEQ");

                                                                    objRtn.A1716MODO = rs14.getString("A3875MODO");
                                                                    objRtn.A1716FUENT = rs14.getString("A3875FUENT");
                                                                    objRtn.A1716SUBFU = rs14.getString("A3875SUBFU");
                                                                    objRtn.A1716FP = rs14.getString("A3875FP");

                                                                    objRtn.A1716FUENT = rs14.getString("A3875FUENT");
                                                                    objRtn.A1716ESTAD = rs14.getString("A3875ESTAD");
                                                                    objRtn.A1716FFILE = rs14.getString("A3875FFILE");
                                                                    objRtn.A1716FPRO = rs14.getString("A3875FPRO");
                                                                    objRtn.A1716GRUPO = rs14.getString("A3875GRUPO");
                                                                    objRtn.A1716CUR = rs14.getString("A3875CUR");
                                                                    objRtn.A1716ACTIV = rs14.getDouble("A3875ACTIV");
                                                                    objRtn.A1716PASIV = rs14.getDouble("A3875PASIV");
                                                                    objRtn.A1716CUENT = rs14.getString("A3875CUENT");
                                                                    objRtn.A1716SUBCU = rs14.getString("A3875SUBCU");
                                                                    objRtn.A1716IDFIL = rs14.getString("A3875IDFIL");
                                                                    objRtn.A1716TIDOC = rs14.getString("A3875TIDOC");
                                                                    objRtn.A1716ORIG = rs14.getString("A3875ORIG");
                                                                    objRtn.A1716FCONT = rs14.getString("A3875FCONT");

                                                                    objRtn.A1716TITU = rs14.getString("A3875TITU");

                                                                    objRtn.A1716COPE = rs14.getString("A3875COPE");
                                                                    objRtn.A1716PROV = rs14.getString("A3875PROV");

                                                                    objRtn.A1716IDCON = rs14.getString("A3875IDCON");

                                                                    objRtn.TCOL = rs14.getString("TCOL");
        //                                                            
        //                                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
        //
        //                                                             }
        //                                                            
                                                                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                                    }

                                                                    lstRtn.add(objRtn);
                                                                }
                                                                if (cstmt01.getMoreResults()) {
                                                                        rs15 = cstmt01.getResultSet();
                                                                        while (rs15.next()) {
                                                                            objRtn = new PX040S01A1716Filter();
                                                                            objRtn.A1716CCUST = rs15.getString("A4070CCUST");
                                                                            objRtn.A1716CIA = rs15.getString("A4070CIA");
                                                                            objRtn.A1716FORMA = rs15.getString("A4070FORMA");
                                                                            objRtn.A1716SERIE = rs15.getString("A4070SERIE");
                                                                            objRtn.A1716CUPON = rs15.getString("A4070CUPON");
                                                                            objRtn.A1716SEQT = rs15.getString("A4070SEQT");
                                                                            objRtn.A1716SEQ = rs15.getString("A4070SEQ");

                                                                            objRtn.A1716MODO = rs15.getString("A4070MODO");
                                                                            objRtn.A1716FUENT = rs15.getString("A4070FUENT");
                                                                            objRtn.A1716SUBFU = rs15.getString("A4070SUBFU");
                                                                            objRtn.A1716FP = rs15.getString("A4070FP");

                                                                            objRtn.A1716FUENT = rs15.getString("A4070FUENT");
                                                                            objRtn.A1716ESTAD = rs15.getString("A4070ESTAD");
                                                                            objRtn.A1716FFILE = rs15.getString("A4070FFILE");
                                                                            objRtn.A1716FPRO = rs15.getString("A4070FPRO");
                                                                            objRtn.A1716GRUPO = rs15.getString("A4070GRUPO");
                                                                            objRtn.A1716CUR = rs15.getString("A4070CUR");
                                                                            objRtn.A1716ACTIV = rs15.getDouble("A4070ACTIV");
                                                                            objRtn.A1716PASIV = rs15.getDouble("A4070PASIV");
                                                                            objRtn.A1716CURRV = rs15.getString("A4070CURRV");
                                                                            objRtn.A1716ACTRV = rs15.getDouble("A4070ACTRV");
                                                                            objRtn.A1716PASRV = rs15.getDouble("A4070PASRV");
                                                                            objRtn.A1716CUENT = rs15.getString("A4070CUENT");
                                                                            objRtn.A1716SUBCU = rs15.getString("A4070SUBCU");
                                                                            objRtn.A1716IDFIL = rs15.getString("A4070IDFIL");
                                                                            objRtn.A1716TIDOC = rs15.getString("A4070TIDOC");
                                                                            objRtn.A1716ORIG = rs15.getString("A4070ORIG");
                                                                            objRtn.A1716FCONT = rs15.getString("A4070FCONT");

                                                                            objRtn.A1716TITU = rs15.getString("A4070TITU");

                                                                            objRtn.A1716COPE = rs15.getString("A4070COPE");
                                                                            objRtn.A1716PROV = rs15.getString("A4070PROV");

                                                                            objRtn.A1716IDCON = rs15.getString("A4070IDCON");

                                                                            objRtn.TCOL = rs15.getString("TCOL");
                                                        //                    
                                                        //                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
                                                        //
                                                        //                     }
                                                        //                    
                                                                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                                                objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                                            }

                                                                            lstRtn.add(objRtn);
                                                                        }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //</editor-fold>
        }
                
        catch (Exception e) {
           logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
       }
                
        finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs02 != null) {
                try {
                    rs02.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs03 != null) {
                try {
                    rs03.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs04 != null) {
                try {
                    rs04.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs05 != null) {
                try {
                    rs05.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs06 != null) {
                try {
                    rs06.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs07 != null) {
                try {
                    rs07.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs08 != null) {
                try {
                    rs08.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs09 != null) {
                try {
                    rs09.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs10 != null) {
                try {
                    rs10.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs11 != null) {
                try {
                    rs11.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs12 != null) {
                try {
                    rs12.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs13 != null) {
                try {
                    rs13.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs14 != null) {
                try {
                    rs14.close();
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
    
    public List<A720> loadPX040S02A720(PX040S02A720Filter filter) throws SQLException, Exception {
        List<A720> lstRtn = new ArrayList<A720>(0);
        A720 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PX040S02A720(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_TYPE);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_PAX);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A720();
                if (filter.IN_TYPE.equals("T")) {
                    objRtn.A720CIAI = rs01.getString("A720CIAI");
                    objRtn.A720FORMAI = rs01.getString("A720FORMAI");
                    objRtn.A720SERIEI = rs01.getString("A720SERIEI");
                } else if (filter.IN_TYPE.equals("P")) {
                    objRtn.A720PAX = rs01.getString("A720PAX");
                }
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

    public List<SQP00697Filter> loadSQP00697OLD(SQP00697Filter filter) throws SQLException, Exception {
        List<SQP00697Filter> lstRtn = new ArrayList<SQP00697Filter>(0);
        SQP00697Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL SQP00697(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TFILTER);
            cstmt01.setString(3, filter.IN_TEXT);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setString(5, filter.page.ROWLST.get(filter.page.PAGNUM));

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00697Filter();
                objRtn.ROWKEY = rs01.getString("ROWKEY");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720FECVTA = Functions.getMonthConvertDate(rs01.getString("A720FECVTA"));
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
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
    
    public List<SQP00697Filter> loadSQP00697(SQP00697Filter filter) throws SQLException, Exception {
        List<SQP00697Filter> lstRtn = new ArrayList<SQP00697Filter>(0);
        SQP00697Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "";
       
            //PARA AVIANCA TODAS LAS COMPAÑIAS USAN EL MISMO PROCESO******************************************
        SQLCLL01 = "{CALL SQP00697(?,?,?,?,?,?,?,?,?)}"; 
//        if(filter.IN_TFILTER == 1 && !"134".equals(filter.IN_TEXT.substring(0, 3)))
//        {
//            SQLCLL01 = "{CALL SQP04574(?,?,?,?,?,?,?,?,?)}"; 
//        }
            //PARA AVIANCA TODAS LAS COMPAÑIAS USAN EL MISMO PROCESO******************************************
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TFILTER);
            cstmt01.setString(3, filter.IN_TEXT);
            cstmt01.setInt(4, filter.page.PAGROW);
            cstmt01.setString(5, "");//filter.page.ROWLST.get(filter.page.PAGNUM));
            cstmt01.setString(6, filter.IN_DATE_FROM);
            cstmt01.setString(7, filter.IN_DATE_TO);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, filter.IN_CAPL);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00697Filter();
                objRtn.ROWKEY = rs01.getString("ROWKEY");
                objRtn.A720PAX = rs01.getString("A720PAX");
                objRtn.TICKET = rs01.getString("TICKET");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720AGENTE  = rs01.getString("A720AGENTE");
                objRtn.A720FECVTA = Functions.getMonthConvertDate(rs01.getString("A720FECVTA"));
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A1531MFOP = rs01.getString("A1531MFOP");
                objRtn.A1531CAPL = rs01.getString("A1531CAPL");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                lstRtn.add(objRtn);
            }
        }catch(SQLException e){
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }catch(Exception e){
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }finally {
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
    
    public List<SQP00250Filter> loadSQP00250(SQP00250Filter filter) throws SQLException, Exception {

        List<SQP00250Filter> lstRtn = new ArrayList<SQP00250Filter>(0);
        SQP00250Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL LIBSAP04.SQP00250(?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PRAXIS.SQP00250(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.IN_CUPON);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00250Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CIA = rs01.getString("CIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.SUBLEG = rs01.getString("SUBLEG");
                objRtn.MDAREV = rs01.getString("MDAREV");
                objRtn.TCAMBIO = rs01.getDouble("TCAMBIO");
                objRtn.CPNVLUN = rs01.getDouble("CPNVLUN");
                objRtn.DSCTOVLUN = rs01.getDouble("DSCTOVLUN");
                objRtn.VALCOMMN = rs01.getDouble("VALCOMMN");
                objRtn.VALOVRCOMN = rs01.getDouble("VALOVRCOMN");
                objRtn.VALYQN = rs01.getDouble("VALYQN");
                objRtn.VALQN = rs01.getDouble("VALQN");
                objRtn.MDALOC = rs01.getString("MDALOC");
                objRtn.LTCAMBIO = rs01.getDouble("LTCAMBIO");
                objRtn.LCPNVLU = rs01.getDouble("LCPNVLU");
                objRtn.LDSCTOVLU = rs01.getDouble("LDSCTOVLU");
                objRtn.LVALCOMM = rs01.getDouble("LVALCOMM");
                objRtn.LVALOVRCOM = rs01.getDouble("LVALOVRCOM");
                objRtn.LVALYQ = rs01.getDouble("LVALYQ");
                objRtn.LVALQ = rs01.getDouble("LVALQ");
                objRtn.MDANAC = rs01.getString("MDANAC");
                objRtn.NTCAMBIO = rs01.getDouble("NTCAMBIO");
                objRtn.NCPNVLU = rs01.getDouble("NCPNVLU");
                objRtn.NDSCTOVLU = rs01.getDouble("NDSCTOVLU");
                objRtn.NVALCOMM = rs01.getDouble("NVALCOMM");
                objRtn.NVALOVRCOM = rs01.getDouble("NVALOVRCOM");
                objRtn.NVALYQ = rs01.getDouble("NVALYQ");
                objRtn.NVALQ = rs01.getDouble("NVALQ");
                objRtn.FBASIS = rs01.getString("FBASIS");
                objRtn.NVLO = rs01.getString("NVLO");
                objRtn.RBD = rs01.getString("RBD");
                objRtn.CLASE = rs01.getString("CLASE");
                objRtn.STPOVER = rs01.getString("STPOVER");
                objRtn.ORIGEN = rs01.getString("ORIGEN");
                objRtn.DESTINO = rs01.getString("DESTINO");
                objRtn.CARRIER = rs01.getString("CARRIER");
                objRtn.FVLO = rs01.getString("FVLO");
                objRtn.GRUPO = rs01.getString("GRUPO");
                objRtn.IDFILE = rs01.getString("IDFILE");
                objRtn.CIAI = rs01.getString("CIAI");
                objRtn.FORSERI = rs01.getString("FORSERI");
                /*
                 objRtn.REGISTRO = rs01.getString("REGISTRO");
                 objRtn.FECREGIS = rs01.getString("FECREGIS");
                 objRtn.FECMODIF = rs01.getString("FECMODIF");
                 objRtn.FECMODIF = rs01.getString("FECMODIF");
                 objRtn.FECMODIF = rs01.getString("FECMODIF");
                 objRtn.HORMODIF = rs01.getString("HORMODIF");
                 */
                objRtn.IN_TKT = rs01.getString("CIA") + "" + rs01.getString("FORMA") + "" + rs01.getString("SERIE");

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
    
    public List<A714> loadS0001A714(A714 filter) throws SQLException, Exception {

        List<A714> lstRtn = new ArrayList<A714>(0);
        A714 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL LIBSAP04.SQP00250(?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PRAXIS.S0001A714(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.A714AIRLIN);
            cstmt01.setString(2, filter.A714CIA);
            cstmt01.setString(3, filter.A714FORMA);
            cstmt01.setString(4, filter.A714SERIE);
            cstmt01.setString(5, filter.A714SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A714();
                objRtn.A714FARE = rs01.getDouble("A714FARE");
                objRtn.A714MDAFA = rs01.getString("A714MDAFA");
                objRtn.A714VFOP = rs01.getDouble("A714VFOP");
                objRtn.A714MDAFP = rs01.getString("A714MDAFP");
                objRtn.A714CIA = rs01.getString("A714CIA");
                objRtn.A714FORMA = rs01.getString("A714FORMA");
                objRtn.A714SEQ = rs01.getString("A714SEQ");
                objRtn.A714SERIE = rs01.getString("A714SERIE");
                objRtn.A714DCHEQ = rs01.getString("A714DCHEQ");
                objRtn.A714GRUPO = rs01.getString("A714GRUPO");
                objRtn.A714ORIG = rs01.getString("A714ORIG");
                objRtn.A714PAIS = rs01.getString("A714PAIS");
                objRtn.A714TRNCU = rs01.getString("A714TRNCU");
                objRtn.A714TDOC = rs01.getString("A714TDOC");
                objRtn.A714COMMIS = rs01.getDouble("A714COMMIS");
                objRtn.A714MDACOM = rs01.getString("A714MDACOM");
                objRtn.A714TSCM = rs01.getDouble("A714TSCM");
                objRtn.A714MDACM = rs01.getString("A714MDACM");
                objRtn.A714MDATC = rs01.getString("A714MDATC");
                objRtn.A714TTXC = rs01.getDouble("A714TTXC");
                objRtn.A714CTAX = rs01.getString("A714CTAX");
                objRtn.A714MDATX = rs01.getString("A714MDATX");
                objRtn.A714TICAP = rs01.getString("A714TICAP");
                objRtn.A714TTAX = rs01.getDouble("A714TTAX");
                objRtn.A714STAT = rs01.getString("A714STAT");
                objRtn.A714MDARV = rs01.getString("A714MDARV");
                objRtn.A714IDFIL = rs01.getString("A714IDFIL");
                objRtn.A714VNETR = rs01.getDouble("A714VNETR");
                objRtn.A714MNETR = rs01.getString("A714MNETR");
                objRtn.A714VNTRR = rs01.getDouble("A714VNTRR");
                objRtn.A714VFOPRV = rs01.getDouble("A714VFOPRV");
                objRtn.A714CFOP = rs01.getString("A714CFOP");
                objRtn.A714TCAMB = rs01.getDouble("A714TCAMB");
                objRtn.A714MIAERR = rs01.getString("A714MIAERR");
                objRtn.A714FECVTA = rs01.getString("A714FECVTA");
                objRtn.A714PAIVTA = rs01.getString("A714PAIVTA");
                objRtn.A714CIUVTA = rs01.getString("A714CIUVTA");
                objRtn.A714RPDA = rs01.getString("A714RPDA");
                objRtn.A714AGENTE = rs01.getString("A714AGENTE");
                objRtn.A714TRNCO = rs01.getString("A714TRNCO");
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
    
    public List<SQP03658Filter> loadSQP03658(SQP03658Filter filter) throws SQLException, Exception {

        List<SQP03658Filter> lstRtn = new ArrayList<SQP03658Filter>(0);
        SQP03658Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL LIBSAP04.SQP00250(?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PRAXIS.SQP03658(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_CCUST);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.IN_CUPON);
            cstmt01.setString(6, filter.IN_SEQROL);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03658Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.CIA = rs01.getString("CIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.SUBLEG = rs01.getString("SUBLEG");
                objRtn.MDAREV = rs01.getString("MDAREV");
                objRtn.TCAMBIO = rs01.getDouble("TCAMBIO");
                objRtn.CPNVLUN = rs01.getDouble("CPNVLUN");
                objRtn.DSCTOVLUN = rs01.getDouble("DSCTOVLUN");
                objRtn.VALCOMMN = rs01.getDouble("VALCOMMN");
                objRtn.VALOVRCOMN = rs01.getDouble("VALOVRCOMN");
                objRtn.VALYQN = rs01.getDouble("VALYQN");
                objRtn.VALQN = rs01.getDouble("VALQN");
                objRtn.MDALOC = rs01.getString("MDALOC");
                objRtn.LTCAMBIO = rs01.getDouble("LTCAMBIO");
                objRtn.LCPNVLU = rs01.getDouble("LCPNVLU");
                objRtn.LDSCTOVLU = rs01.getDouble("LDSCTOVLU");
                objRtn.LVALCOMM = rs01.getDouble("LVALCOMM");
                objRtn.LVALOVRCOM = rs01.getDouble("LVALOVRCOM");
                objRtn.LVALYQ = rs01.getDouble("LVALYQ");
                objRtn.LVALQ = rs01.getDouble("LVALQ");

                objRtn.MDANAC = rs01.getString("MDANAC");
                objRtn.NTCAMBIO = rs01.getDouble("NTCAMBIO");
                objRtn.NCPNVLU = rs01.getDouble("NCPNVLU");
                objRtn.NDSCTOVLU = rs01.getDouble("NDSCTOVLU");
                objRtn.NVALCOMM = rs01.getDouble("NVALCOMM");
                objRtn.NVALOVRCOM = rs01.getDouble("NVALOVRCOM");
                objRtn.NVALYQ = rs01.getDouble("NVALYQ");
                objRtn.NVALQ = rs01.getDouble("NVALQ");

                objRtn.FBASIS = rs01.getString("FBASIS");
                objRtn.NVLO = rs01.getString("NVLO");
                objRtn.RBD = rs01.getString("RBD");
                objRtn.CLASE = rs01.getString("CLASE");
                objRtn.STPOVER = rs01.getString("STPOVER");
                objRtn.ORIGEN = rs01.getString("ORIGEN");
                objRtn.DESTINO = rs01.getString("DESTINO");
                objRtn.CARRIER = rs01.getString("CARRIER");
                objRtn.FVLO = rs01.getString("FVLO");
                objRtn.GRUPO = rs01.getString("GRUPO");

                objRtn.IDFILE = rs01.getString("IDFILE");
                objRtn.CIAI = rs01.getString("CIAI");
                objRtn.FORSERI = rs01.getString("FORSERI");
                objRtn.FORSERI = rs01.getString("FORSERI");
                objRtn.IDNRCARR = rs01.getString("IDNRCARR");
                /*
                 objRtn.REGISTRO = rs01.getString("REGISTRO");
                 objRtn.FECREGIS = rs01.getString("FECREGIS");
                 objRtn.FECMODIF = rs01.getString("FECMODIF");
                 objRtn.FECMODIF = rs01.getString("FECMODIF");
                 objRtn.FECMODIF = rs01.getString("FECMODIF");
                 objRtn.HORMODIF = rs01.getString("HORMODIF");
                 */
                objRtn.IN_TKT = rs01.getString("CIA") + "" + rs01.getString("FORMA") + "" + rs01.getString("SERIE");

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
    
    public PX040S01A720Filter loadSQP02665(PX040S01A720Filter filter) throws SQLException, Exception {
        PX040S01A720ResultSet01 objRtn;
        PX040S01A720ResultSet02 objRtn02;
        PX040S01A720ResultSet03 objRtn03;
        PX040S01A720ResultSet04 objRtn04;
        PX040S01A720ResultSet05 objRtn05, objRtn06;
        PX040S01A720ResultSet07 objRtn07, objRtn08, objRtn09, objRtn10;
        PX040S01A720ResultSet11 objRtn11;
        PX040S01A720ResultSet12 objRtn12;
        PX040S01A720ResultSet13 objRtn13;
        PX040S01A720ResultSet14 objRtn14;
        PX040S01A720ResultSet15 objRtn15;

        PreparedStatement pstmt01 = null, pstmt02 = null;
        ResultSet rstst01 = null, rstst02 = null;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null, rs05 = null, rs06 = null, rs07 = null, rs08 = null, rs09 = null, rs10 = null, rs11 = null, rs12 = null, rs13 = null, rs14 = null, rs15 = null;
        //<editor-fold defaultstate="collapsed" desc="{...} SQL Sentences">
        String SQLQRY01 = "SELECT"
                + "   A720CIAI,A720FORMAI,A720SERIEI"
                + " FROM PRAXIS.A3200 WHERE"
                + "   A720AIRLIN=? AND A720CIA=? AND A720FORMA=? AND A720SERIE=?"
                + " GROUP BY"
                + "   A720CIAI,A720FORMAI,A720SERIEI";
        String SQLQRY02 = "SELECT"
                + "   A720CIA,A720FORMA,A720SERIE,A720SEQ"
                + " FROM PRAXIS.A3200 WHERE"
                + "   A720AIRLIN=? AND A720CIAI=? AND A720FORMAI=? AND A720SERIEI=?"
                + " ORDER BY"
                + "   A720SEQ ASC";

        String SQLCLL01 = "{CALL PRAXIS.SQP02665(?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL SQP00249_1(?,?,?,?,?)}";

        //</editor-fold>
        Connection cnx = null;
        int intCountA720 = 0;
        String strV_CIA = null, strV_FORMA = null, strV_SERIE = null;
        String strA720CIA = null, strA720FORMA = null, strA720SERIE = null, strA720SEQ = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            if(filter.IN_SEQ.isEmpty()){
                pstmt01 = cnx.prepareStatement(SQLQRY01);
                pstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                pstmt01.setString(2, filter.IN_CIA);
                pstmt01.setString(3, filter.IN_FORMA);
                pstmt01.setString(4, filter.IN_SERIE);
                rstst01 = pstmt01.executeQuery();
                while(rstst01.next()){
                    intCountA720++;
                    strV_CIA = rstst01.getString("A720CIAI");
                    strV_FORMA = rstst01.getString("A720FORMAI");
                    strV_SERIE = rstst01.getString("A720SERIEI");
                }
                if(intCountA720 == 1){
                    intCountA720 = 0;
                    pstmt02 = cnx.prepareStatement(SQLQRY02);
                    pstmt02.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    pstmt02.setString(2, strV_CIA);
                    pstmt02.setString(3, strV_FORMA);
                    pstmt02.setString(4, strV_SERIE);
                    rstst02 = pstmt02.executeQuery();
                    while(rstst02.next()){
                        intCountA720++;
                        strA720CIA = rstst02.getString("A720CIA");
                        strA720FORMA = rstst02.getString("A720FORMA");
                        strA720SERIE = rstst02.getString("A720SERIE");
                        strA720SEQ = rstst02.getString("A720SEQ");
                    }
                    if(intCountA720 == 1){
                        filter.IN_CIA = strA720CIA;
                        filter.IN_FORMA = strA720FORMA;
                        filter.IN_SERIE = strA720SERIE;
                        filter.IN_SEQ = strA720SEQ;
                    }
                }
            }
            if(!filter.IN_SEQ.isEmpty()){
                //<editor-fold defaultstate="collapsed" desc="{...} Call Store">
                cstmt01 = cnx.prepareCall(SQLCLL01);

                cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(2, filter.IN_CIA);
                cstmt01.setString(3, filter.IN_FORMA);
                cstmt01.setString(4, filter.IN_SERIE);
                cstmt01.setString(5, filter.IN_SEQ);

                cstmt01.execute();

                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new PX040S01A720ResultSet01();
                    objRtn.fileA720.A720CIA = rs01.getString("A720CIA");
                    objRtn.fileA720.A720FORMA = rs01.getString("A720FORMA");
                    objRtn.fileA720.A720SERIE = rs01.getString("A720SERIE");

                    objRtn.fileA720.A720CIAI = rs01.getString("A720CIAI");
                    objRtn.fileA720.A720FORMAI = rs01.getString("A720FORMAI");
                    objRtn.fileA720.A720SERIEI = rs01.getString("A720SERIEI");

                    objRtn.fileA720.A720PNR = rs01.getString("A720PNR");
                    //objRtn.fileA720.A720FRESV = rs01.getString("A720FRESV");

                    objRtn.fileA1530.A1530FHAST = rs01.getString("A1530FHAST");
                    objRtn.fileA1530.A1530MDA = rs01.getString("A1530MDA");

                    objRtn.fileA720.A720AGENTE = rs01.getString("A720AGENTE");
                    objRtn.fileA720.A720FECVTA = rs01.getString("A720FECVTA");

                    objRtn.fileA003.A003KEY1 = rs01.getString("A003KEY1");
                    objRtn.fileA003.A003PROVIN = rs01.getString("A003PROVIN");
                    objRtn.fileA003.A003CIUDAD = rs01.getString("A003CIUDAD");
                    objRtn.fileA1007.A1007NOMCD = rs01.getString("A1007NOMCD");

                    objRtn.fileA720.A720PAX = rs01.getString("A720PAX");
                    objRtn.fileA720.A720TVENTA = rs01.getString("A720TVENTA");
                    objRtn.fileA720.A720CODIT = rs01.getString("A720CODIT");

                    objRtn.fileA1530.A1530FUENT = rs01.getString("A1530FUENT");
                    objRtn.fileA1530.A1530PSVTA = rs01.getString("A1530PSVTA");

                    objRtn.fileA720.A720SASI = rs01.getString("A720SASI");
                    objRtn.fileA720.A720TICAP = rs01.getString("A720TICAP");

                    objRtn.fileA720.A720ACCO = rs01.getString("A720ACCO");
                    objRtn.fileA720.A720ACCD = rs01.getString("A720ACCD");
                    objRtn.fileA720.A720ETKT = rs01.getString("A720ETKT");

                    objRtn.fileA1530.A1530FCONT = rs01.getString("A1530FCONT");
                    objRtn.fileA1530.A1530IDCON = rs01.getString("A1530IDCON");

                    objRtn.fileA1530.A1530TCAMB = rs01.getDouble("A1530TCAMB");
                    objRtn.fileA1530.A1530TCAMP = rs01.getDouble("A1530TCAMP");

                    objRtn.fileA720.A720TARI1 = rs01.getDouble("A720TARI1");
                    objRtn.fileA720.A720TARI2 = rs01.getDouble("A720TARI2");
                    objRtn.fileA720.A720TARI3 = rs01.getDouble("A720TARI3");
                    objRtn.fileA720.A720TARI4 = rs01.getDouble("A720TARI4");
                    objRtn.fileA720.A720TQ = rs01.getDouble("A720TQ");
                    objRtn.fileA720.A720TQRV = rs01.getDouble("A720TQRV");

                    objRtn.fileA720.A720TARIFA = rs01.getDouble("A720TARIFA");
                    objRtn.fileA720.A720MONEDA = rs01.getString("A720MONEDA");
                    objRtn.fileA720.A720TRFPAG = rs01.getDouble("A720TRFPAG");
                    objRtn.fileA720.A720MDAPAG = rs01.getString("A720MDAPAG");
                    objRtn.fileA720.A720TCOM = rs01.getDouble("A720TCOM");
                    objRtn.fileA720.A720TCOMRV = rs01.getDouble("A720TCOMRV");
                    objRtn.fileA720.A720MDACM = rs01.getString("A720MDACM");
                    objRtn.fileA720.A720MDARV = rs01.getString("A720MDARV");

                    objRtn.fileA720.A720COMMIS = rs01.getDouble("A720COMMIS");
                    objRtn.fileA720.A720TSCM = rs01.getDouble("A720TSCM");
                    objRtn.fileA720.A720MDACOM = rs01.getString("A720MDACOM");

                    objRtn.fileA720.A720ROE = rs01.getDouble("A720ROE");
                    objRtn.fileA720.A720FARE = rs01.getDouble("A720FARE");
                    objRtn.fileA720.A720TKVOID = rs01.getString("A720TKVOID");

                    objRtn.fileA720.A720TCAMB = rs01.getDouble("A720TCAMB");

                    objRtn.fileA720.A720YQ1 = rs01.getDouble("A720YQ1");
                    objRtn.fileA720.A720YQ2 = rs01.getDouble("A720YQ2");
                    objRtn.fileA720.A720YQ3 = rs01.getDouble("A720YQ3");
                    objRtn.fileA720.A720YQ4 = rs01.getDouble("A720YQ4");

                    objRtn.fileA720.A720PRRCM1 = rs01.getDouble("A720PRRCM1");
                    objRtn.fileA720.A720PRRCM2 = rs01.getDouble("A720PRRCM2");
                    objRtn.fileA720.A720PRRCM3 = rs01.getDouble("A720PRRCM3");
                    objRtn.fileA720.A720PRRCM4 = rs01.getDouble("A720PRRCM4");

                    objRtn.fileA720.A720PRSCM1 = rs01.getDouble("A720PRSCM1");
                    objRtn.fileA720.A720PRSCM2 = rs01.getDouble("A720PRSCM2");
                    objRtn.fileA720.A720PRSCM3 = rs01.getDouble("A720PRSCM3");
                    objRtn.fileA720.A720PRSCM4 = rs01.getDouble("A720PRSCM4");

                    objRtn.fileA720.A720VALOR1 = rs01.getDouble("A720VALOR1");
                    objRtn.fileA720.A720VALOR2 = rs01.getDouble("A720VALOR2");
                    objRtn.fileA720.A720VALOR3 = rs01.getDouble("A720VALOR3");
                    objRtn.fileA720.A720VALOR4 = rs01.getDouble("A720VALOR4");

                    objRtn.fileA720.A720ORIGEX = rs01.getDouble("A720ORIGEX");
                    /**/
                    objRtn.fileA720.A720TTCOMM = rs01.getDouble("A720TTCOMM");
                    objRtn.fileA720.A720TTSCMM = rs01.getDouble("A720TTSCMM");

                    objRtn.fileA720.A720TYQ = rs01.getDouble("A720TYQ");

                    objRtn.fileA720.A720VALOL1 = rs01.getDouble("A720VALOL1");
                    objRtn.fileA720.A720VALOL2 = rs01.getDouble("A720VALOL2");
                    objRtn.fileA720.A720VALOL3 = rs01.getDouble("A720VALOL3");
                    objRtn.fileA720.A720VALOL4 = rs01.getDouble("A720VALOL4");

                    objRtn.fileA720.A720LRRCM1 = rs01.getDouble("A720LRRCM1");
                    objRtn.fileA720.A720LRRCM2 = rs01.getDouble("A720LRRCM2");
                    objRtn.fileA720.A720LRRCM3 = rs01.getDouble("A720LRRCM3");
                    objRtn.fileA720.A720LRRCM4 = rs01.getDouble("A720LRRCM4");

                    objRtn.fileA720.A720LRSCM1 = rs01.getDouble("A720LRSCM1");
                    objRtn.fileA720.A720LRSCM2 = rs01.getDouble("A720LRSCM2");
                    objRtn.fileA720.A720LRSCM3 = rs01.getDouble("A720LRSCM3");
                    objRtn.fileA720.A720LRSCM4 = rs01.getDouble("A720LRSCM4");

                    objRtn.fileA720.A720LYQ1 = rs01.getDouble("A720LYQ1");
                    objRtn.fileA720.A720LYQ2 = rs01.getDouble("A720LYQ2");
                    objRtn.fileA720.A720LYQ3 = rs01.getDouble("A720LYQ3");
                    objRtn.fileA720.A720LYQ4 = rs01.getDouble("A720LYQ4");

                    objRtn.fileA720.A720BOOKI1 = rs01.getString("A720BOOKI1");
                    objRtn.fileA720.A720BOOKI2 = rs01.getString("A720BOOKI2");
                    objRtn.fileA720.A720BOOKI3 = rs01.getString("A720BOOKI3");
                    objRtn.fileA720.A720BOOKI4 = rs01.getString("A720BOOKI4");

                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 1">
                    objRtn.fileA720.A720CONEX1 = rs01.getString("A720CONEX1");
                    objRtn.fileA720.A720RUTA0 = rs01.getString("A720RUTA0");
                    objRtn.fileA720.A720RUTA1 = rs01.getString("A720RUTA1");
                    objRtn.fileA720.A720CARRA1 = rs01.getString("A720CARRA1");
                    objRtn.fileA720.A720NVLO1 = rs01.getString("A720NVLO1");
                    objRtn.fileA720.A720FVLO1 = rs01.getString("A720FVLO1");
                    objRtn.fileA720.A720HVLO1 = rs01.getString("A720HVLO1");
                    objRtn.fileA720.A720FBST1 = rs01.getString("A720FBST1");
                    objRtn.fileA720.A720CLASE1 = rs01.getString("A720CLASE1");
                    objRtn.fileA720.A720FBUSO1 = rs01.getString("A720FBUSO1");
                    objRtn.fileA720.A720CARRO1 = rs01.getString("A720CARRO1");
                    objRtn.fileA720.A720NVLOO1 = rs01.getString("A720NVLOO1");
                    objRtn.fileA720.A720NBDA1 = rs01.getString("A720NBDA1");
                    objRtn.fileA720.A720NADA1 = rs01.getString("A720NADA1");
                    objRtn.fileA720.Leg1 = rs01.getString("LEG1");
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 2">
                    objRtn.fileA720.A720CONEX2 = rs01.getString("A720CONEX2");
                    objRtn.fileA720.A720RUTA2 = rs01.getString("A720RUTA2");
                    objRtn.fileA720.A720CARRA2 = rs01.getString("A720CARRA2");
                    objRtn.fileA720.A720NVLO2 = rs01.getString("A720NVLO2");
                    objRtn.fileA720.A720FVLO2 = rs01.getString("A720FVLO2");
                    objRtn.fileA720.A720HVLO2 = rs01.getString("A720HVLO2");
                    objRtn.fileA720.A720FBST2 = rs01.getString("A720FBST2");
                    objRtn.fileA720.A720CLASE2 = rs01.getString("A720CLASE2");
                    objRtn.fileA720.A720FBUSO2 = rs01.getString("A720FBUSO2");
                    objRtn.fileA720.A720CARRO2 = rs01.getString("A720CARRO2");
                    objRtn.fileA720.A720NVLOO2 = rs01.getString("A720NVLOO2");
                    objRtn.fileA720.A720NBDA2 = rs01.getString("A720NBDA2");
                    objRtn.fileA720.A720NADA2 = rs01.getString("A720NADA2");
                    objRtn.fileA720.Leg2 = rs01.getString("LEG2");
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 3">
                    objRtn.fileA720.A720CONEX3 = rs01.getString("A720CONEX3");
                    objRtn.fileA720.A720RUTA3 = rs01.getString("A720RUTA3");
                    objRtn.fileA720.A720CARRA3 = rs01.getString("A720CARRA3");
                    objRtn.fileA720.A720NVLO3 = rs01.getString("A720NVLO3");
                    objRtn.fileA720.A720FVLO3 = rs01.getString("A720FVLO3");
                    objRtn.fileA720.A720HVLO3 = rs01.getString("A720HVLO3");
                    objRtn.fileA720.A720FBST3 = rs01.getString("A720FBST3");
                    objRtn.fileA720.A720CLASE3 = rs01.getString("A720CLASE3");
                    objRtn.fileA720.A720FBUSO3 = rs01.getString("A720FBUSO3");
                    objRtn.fileA720.A720CARRO3 = rs01.getString("A720CARRO3");
                    objRtn.fileA720.A720NVLOO3 = rs01.getString("A720NVLOO3");
                    objRtn.fileA720.A720NBDA3 = rs01.getString("A720NBDA3");
                    objRtn.fileA720.A720NADA3 = rs01.getString("A720NADA3");
                    objRtn.fileA720.Leg3 = rs01.getString("LEG3");
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...} A720 Coupon 4">
                    objRtn.fileA720.A720CONEX4 = rs01.getString("A720CONEX4");
                    objRtn.fileA720.A720RUTA4 = rs01.getString("A720RUTA4");
                    objRtn.fileA720.A720CARRA4 = rs01.getString("A720CARRA4");
                    objRtn.fileA720.A720NVLO4 = rs01.getString("A720NVLO4");
                    objRtn.fileA720.A720FVLO4 = rs01.getString("A720FVLO4");
                    objRtn.fileA720.A720HVLO4 = rs01.getString("A720HVLO4");
                    objRtn.fileA720.A720FBST4 = rs01.getString("A720FBST4");
                    objRtn.fileA720.A720CLASE4 = rs01.getString("A720CLASE4");
                    objRtn.fileA720.A720FBUSO4 = rs01.getString("A720FBUSO4");
                    objRtn.fileA720.A720CARRO4 = rs01.getString("A720CARRO4");
                    objRtn.fileA720.A720NVLOO4 = rs01.getString("A720NVLOO4");
                    objRtn.fileA720.A720NBDA4 = rs01.getString("A720NBDA4");
                    objRtn.fileA720.A720NADA4 = rs01.getString("A720NADA4");
                    objRtn.fileA720.Leg4 = rs01.getString("LEG4");
                    //</editor-fold>

                    objRtn.fileA720.A720TDOC = rs01.getString("A720TDOC");
                    objRtn.fileA720.A720TDOC_COD = rs01.getString("A720TDOC_COD");
                    objRtn.fileA720.A720TDOC_CON = rs01.getString("A720TDOC_CON");

                    objRtn.fileA720.A720TRNCU = rs01.getString("A720TRNCU");

                    objRtn.fileA720.A1672_AUDITED = rs01.getInt("A1672_AUDITED");
                    objRtn.fileA720.A1672_MEMORAISED = rs01.getInt("A1672_MEMORAISED");
                    objRtn.fileA720.A1672_PREME = rs01.getString("A1672_PREME");
                    objRtn.fileA720.A2548_NMEMO = rs01.getString("A2548_NMEMO");
                    //objRtn.fileA720.A2289_ESTADO = rs01.getString("CHG").trim();

                    filter.lstResultSet01.add(objRtn);
                }
                if (cstmt01.getMoreResults()) {
                    rs02 = cstmt01.getResultSet();
                    while (rs02.next()) {
                        objRtn02 = new PX040S01A720ResultSet02();
                        objRtn02.fileA730.A730CIA = rs02.getString("A730CIA");
                        objRtn02.fileA730.A730FORMA = rs02.getString("A730FORMA");
                        objRtn02.fileA730.A730SERIE = rs02.getString("A730SERIE");

                        objRtn02.fileA730.A730LOHO1 = rs02.getString("A730LOHO1");
                        objRtn02.fileA730.A730LOHO2 = rs02.getString("A730LOHO2");
                        objRtn02.fileA730.A730LOHO3 = rs02.getString("A730LOHO3");
                        objRtn02.fileA730.A730LOHO4 = rs02.getString("A730LOHO4");
                        objRtn02.fileA730.A730CUPON1 = rs02.getString("A730CUPON1");
                        objRtn02.fileA730.A730CUPON2 = rs02.getString("A730CUPON2");
                        objRtn02.fileA730.A730CUPON3 = rs02.getString("A730CUPON3");
                        objRtn02.fileA730.A730CUPON4 = rs02.getString("A730CUPON4");
                        objRtn02.fileA730.A730MONREG = rs02.getString("A730MONREG");
                        objRtn02.fileA730.A730FECVTA = rs02.getString("A730FECVTA");

                        objRtn02.fileA730.A730CIA720 = rs02.getString("A730CIA720");
                        objRtn02.fileA730.A730FOR720 = rs02.getString("A730FOR720");
                        objRtn02.fileA730.A730SER720 = rs02.getString("A730SER720");
                        objRtn02.fileA730.A730SEQUEN = rs02.getString("A730SEQUEN");

                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 1">
                        objRtn02.fileA730.A730CONEX1 = rs02.getString("A730CONEX1");
                        objRtn02.fileA730.A730RUTA0 = rs02.getString("A730RUTA0");
                        objRtn02.fileA730.A730RUTA1 = rs02.getString("A730RUTA1");
                        objRtn02.fileA730.A730CARRA1 = rs02.getString("A730CARRA1");
                        objRtn02.fileA730.A730NVLO1 = rs02.getString("A730NVLO1");
                        objRtn02.fileA730.A730FVLO1 = rs02.getString("A730FVLO1");
                        objRtn02.fileA730.A730CLASE1 = rs02.getString("A730CLASE1");
                        objRtn02.fileA730.A730FBUSO1 = rs02.getString("A730FBUSO1");
                        objRtn02.fileA730.A730VALOR1 = rs02.getDouble("A730VALOR1");
                        objRtn02.fileA730.A730Q1 = rs02.getDouble("A730Q1");
                        objRtn02.fileA730.A730PRRCM1 = rs02.getDouble("A730PRRCM1");
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 2">
                        objRtn02.fileA730.A730CONEX2 = rs02.getString("A730CONEX2");
                        objRtn02.fileA730.A730RUTA2 = rs02.getString("A730RUTA2");
                        objRtn02.fileA730.A730CARRA2 = rs02.getString("A730CARRA2");
                        objRtn02.fileA730.A730NVLO2 = rs02.getString("A730NVLO2");
                        objRtn02.fileA730.A730FVLO2 = rs02.getString("A730FVLO2");
                        objRtn02.fileA730.A730CLASE2 = rs02.getString("A730CLASE2");
                        objRtn02.fileA730.A730FBUSO2 = rs02.getString("A730FBUSO2");
                        objRtn02.fileA730.A730VALOR2 = rs02.getDouble("A730VALOR2");
                        objRtn02.fileA730.A730Q2 = rs02.getDouble("A730Q2");
                        objRtn02.fileA730.A730PRRCM2 = rs02.getDouble("A730PRRCM2");
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 3">
                        objRtn02.fileA730.A730CONEX3 = rs02.getString("A730CONEX3");
                        objRtn02.fileA730.A730RUTA3 = rs02.getString("A730RUTA3");
                        objRtn02.fileA730.A730CARRA3 = rs02.getString("A730CARRA3");
                        objRtn02.fileA730.A730NVLO3 = rs02.getString("A730NVLO3");
                        objRtn02.fileA730.A730FVLO3 = rs02.getString("A730FVLO3");
                        objRtn02.fileA730.A730CLASE3 = rs02.getString("A730CLASE3");
                        objRtn02.fileA730.A730FBUSO3 = rs02.getString("A730FBUSO3");
                        objRtn02.fileA730.A730VALOR3 = rs02.getDouble("A730VALOR3");
                        objRtn02.fileA730.A730Q3 = rs02.getDouble("A730Q3");
                        objRtn02.fileA730.A730PRRCM3 = rs02.getDouble("A730PRRCM3");
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="{...} A730 Coupon 4">
                        objRtn02.fileA730.A730CONEX4 = rs02.getString("A730CONEX4");
                        objRtn02.fileA730.A730RUTA4 = rs02.getString("A730RUTA4");
                        objRtn02.fileA730.A730CARRA4 = rs02.getString("A730CARRA4");
                        objRtn02.fileA730.A730NVLO4 = rs02.getString("A730NVLO4");
                        objRtn02.fileA730.A730FVLO4 = rs02.getString("A730FVLO4");
                        objRtn02.fileA730.A730CLASE4 = rs02.getString("A730CLASE4");
                        objRtn02.fileA730.A730FBUSO4 = rs02.getString("A730FBUSO4");
                        objRtn02.fileA730.A730VALOR4 = rs02.getDouble("A730VALOR4");
                        objRtn02.fileA730.A730Q4 = rs02.getDouble("A730Q4");
                        objRtn02.fileA730.A730PRRCM4 = rs02.getDouble("A730PRRCM4");
                        //</editor-fold>
                        filter.lstResultSet02.add(objRtn02);
                    }
                    if (cstmt01.getMoreResults()) {
                        rs03 = cstmt01.getResultSet();
                        while (rs03.next()) {
                            objRtn03 = new PX040S01A720ResultSet03();
                            objRtn03.fileA713.A713CIA = rs03.getString("A713CIA");
                            objRtn03.fileA713.A713FORMA = rs03.getString("A713FORMA");
                            objRtn03.fileA713.A713SERIE = rs03.getString("A713SERIE");

                            objRtn03.fileA713.A713MONREG = rs03.getString("A713MONREG");
                            objRtn03.fileA713.A713FECVTA = rs03.getString("A713FECVTA");
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 1">
                            objRtn03.fileA713.A713CONEX1 = rs03.getString("A713CONEX1");
                            objRtn03.fileA713.A713RUTA0 = rs03.getString("A713RUTA0");
                            objRtn03.fileA713.A713RUTA1 = rs03.getString("A713RUTA1");
                            objRtn03.fileA713.A713CARRA1 = rs03.getString("A713CARRA1");
                            objRtn03.fileA713.A713NVLO1 = rs03.getString("A713NVLO1");
                            objRtn03.fileA713.A713FVLO1 = rs03.getString("A713FVLO1");
                            objRtn03.fileA713.A713CLASE1 = rs03.getString("A713CLASE1");
                            objRtn03.fileA713.A713FBUSO1 = rs03.getString("A713FBUSO1");
                            objRtn03.fileA713.A713VALOR1 = rs03.getDouble("A713VALOR1");
                            objRtn03.fileA713.A713Q1 = rs03.getDouble("A713Q1");
                            objRtn03.fileA713.A713PRRCM1 = rs03.getDouble("A713PRRCM1");
                            //</editor-fold>
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 2">
                            objRtn03.fileA713.A713CONEX2 = rs03.getString("A713CONEX2");
                            objRtn03.fileA713.A713RUTA2 = rs03.getString("A713RUTA2");
                            objRtn03.fileA713.A713CARRA2 = rs03.getString("A713CARRA2");
                            objRtn03.fileA713.A713NVLO2 = rs03.getString("A713NVLO2");
                            objRtn03.fileA713.A713FVLO2 = rs03.getString("A713FVLO2");
                            objRtn03.fileA713.A713CLASE2 = rs03.getString("A713CLASE2");
                            objRtn03.fileA713.A713FBUSO2 = rs03.getString("A713FBUSO2");
                            objRtn03.fileA713.A713VALOR2 = rs03.getDouble("A713VALOR2");
                            objRtn03.fileA713.A713Q2 = rs03.getDouble("A713Q2");
                            objRtn03.fileA713.A713PRRCM2 = rs03.getDouble("A713PRRCM2");
                            //</editor-fold>
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 3">
                            objRtn03.fileA713.A713CONEX3 = rs03.getString("A713CONEX3");
                            objRtn03.fileA713.A713RUTA3 = rs03.getString("A713RUTA3");
                            objRtn03.fileA713.A713CARRA3 = rs03.getString("A713CARRA3");
                            objRtn03.fileA713.A713NVLO3 = rs03.getString("A713NVLO3");
                            objRtn03.fileA713.A713FVLO3 = rs03.getString("A713FVLO3");
                            objRtn03.fileA713.A713CLASE3 = rs03.getString("A713CLASE3");
                            objRtn03.fileA713.A713FBUSO3 = rs03.getString("A713FBUSO3");
                            objRtn03.fileA713.A713VALOR3 = rs03.getDouble("A713VALOR3");
                            objRtn03.fileA713.A713Q3 = rs03.getDouble("A713Q3");
                            objRtn03.fileA713.A713PRRCM3 = rs03.getDouble("A713PRRCM3");
                            //</editor-fold>
                            //<editor-fold defaultstate="collapsed" desc="{...} A713 Coupon 4">
                            objRtn03.fileA713.A713CONEX4 = rs03.getString("A713CONEX4");
                            objRtn03.fileA713.A713RUTA4 = rs03.getString("A713RUTA4");
                            objRtn03.fileA713.A713CARRA4 = rs03.getString("A713CARRA4");
                            objRtn03.fileA713.A713NVLO4 = rs03.getString("A713NVLO4");
                            objRtn03.fileA713.A713FVLO4 = rs03.getString("A713FVLO4");
                            objRtn03.fileA713.A713CLASE4 = rs03.getString("A713CLASE4");
                            objRtn03.fileA713.A713FBUSO4 = rs03.getString("A713FBUSO4");
                            objRtn03.fileA713.A713VALOR4 = rs03.getDouble("A713VALOR4");
                            objRtn03.fileA713.A713Q4 = rs03.getDouble("A713Q4");
                            objRtn03.fileA713.A713PRRCM4 = rs03.getDouble("A713PRRCM4");
                            //</editor-fold>
                            objRtn03.fileA713.A713CPUI = rs03.getString("A713CPUI");

                            objRtn03.fileA713.A713CUPON1 = rs03.getString("A713CUPON1");
                            objRtn03.fileA713.A713CUPON2 = rs03.getString("A713CUPON2");
                            objRtn03.fileA713.A713CUPON3 = rs03.getString("A713CUPON3");
                            objRtn03.fileA713.A713CUPON4 = rs03.getString("A713CUPON4");
                            filter.lstResultSet03.add(objRtn03);
                        }
                        if (cstmt01.getMoreResults()) {
                            rs04 = cstmt01.getResultSet();
                            while (rs04.next()) {
                                objRtn04 = new PX040S01A720ResultSet04();
                                objRtn04.fileA1721.A1721TIPO = rs04.getString("A1721TIPO");
                                objRtn04.fileA1721.A1721FRCA = rs04.getString("A1721FRCA");
                                filter.lstResultSet04.add(objRtn04);
                            }
                            if (cstmt01.getMoreResults()) {
                                rs05 = cstmt01.getResultSet();
                                while (rs05.next()) {
                                    objRtn05 = new PX040S01A720ResultSet05();
                                    objRtn05.fileA1532.A1532CTAX = rs05.getString("A1532CTAX");
                                    objRtn05.fileA1532.A1532MTAX = rs05.getString("A1532MTAX");
                                    objRtn05.fileA1532.A1532VTAX = rs05.getDouble("A1532VTAX");
                                    filter.lstResultSet05.add(objRtn05);
                                }
                                if (cstmt01.getMoreResults()) {
                                    rs06 = cstmt01.getResultSet();
                                    while (rs06.next()) {
                                        objRtn06 = new PX040S01A720ResultSet05();
                                        objRtn06.fileA1532.A1532CTAX = rs06.getString("A1532CTAX");
                                        objRtn06.fileA1532.A1532MTAX = rs06.getString("A1532MTAX");
                                        objRtn06.fileA1532.A1532VTAX = rs06.getDouble("A1532VTAX");
                                        filter.lstResultSet06.add(objRtn06);
                                    }
                                    if (cstmt01.getMoreResults()) {
                                        rs07 = cstmt01.getResultSet();
                                        while (rs07.next()) {
                                            objRtn07 = new PX040S01A720ResultSet07();
                                            objRtn07.fileA1531.A1531CFOP = rs07.getString("A1531CFOP");
                                            objRtn07.fileA1531.A1531TFOP = rs07.getString("A1531TFOP");
                                            objRtn07.fileA1531.A1531TTARJ = rs07.getString("A1531TTARJ");
                                            objRtn07.fileA1531.A1531VFOP = rs07.getDouble("A1531VFOP");
                                            objRtn07.fileA1531.A1531MFOP = rs07.getString("A1531MFOP");
                                            objRtn07.fileA1531.A1531NREF = rs07.getString("A1531NREF");
                                            objRtn07.fileA1531.A1531CAPL = rs07.getString("A1531CAPL");
                                            filter.lstResultSet07.add(objRtn07);
                                        }
                                        if (cstmt01.getMoreResults()) {
                                            rs08 = cstmt01.getResultSet();
                                            while (rs08.next()) {
                                                objRtn08 = new PX040S01A720ResultSet07();
                                                objRtn08.fileA1531.A1531CFOP = rs08.getString("A1531CFOP");
                                                objRtn08.fileA1531.A1531TFOP = rs08.getString("A1531TFOP");
                                                objRtn08.fileA1531.A1531TTARJ = rs08.getString("A1531TTARJ");
                                                objRtn08.fileA1531.A1531VFOP = rs08.getDouble("A1531VFOP");
                                                objRtn08.fileA1531.A1531MFOP = rs08.getString("A1531MFOP");
                                                objRtn08.fileA1531.A1531NREF = rs08.getString("A1531NREF");
                                                objRtn08.fileA1531.A1531CAPL = rs08.getString("A1531CAPL");
                                                filter.lstResultSet08.add(objRtn08);
                                            }
                                            if (cstmt01.getMoreResults()) {
                                                rs09 = cstmt01.getResultSet();
                                                while (rs09.next()) {
                                                    objRtn09 = new PX040S01A720ResultSet07();
                                                    objRtn09.fileA1531.A1531CFOP = rs09.getString("A1531CFOP");
                                                    objRtn09.fileA1531.A1531TFOP = rs09.getString("A1531TFOP");
                                                    objRtn09.fileA1531.A1531TTARJ = rs09.getString("A1531TTARJ");
                                                    objRtn09.fileA1531.A1531VFOP = rs09.getDouble("A1531VFOP");
                                                    objRtn09.fileA1531.A1531MFOP = rs09.getString("A1531MFOP");
                                                    objRtn09.fileA1531.A1531NREF = rs09.getString("A1531NREF");
                                                    objRtn09.fileA1531.A1531CAPL = rs09.getString("A1531CAPL");
                                                    filter.lstResultSet09.add(objRtn09);
                                                }
                                                if (cstmt01.getMoreResults()) {
                                                    rs10 = cstmt01.getResultSet();
                                                    while (rs10.next()) {
                                                        objRtn10 = new PX040S01A720ResultSet07();
                                                        objRtn10.fileA1531.A1531NREF = rs10.getString("A1531NREF");
                                                        objRtn10.fileA1531.A1531CAPL = rs10.getString("A1531CAPL");
                                                        filter.lstResultSet10.add(objRtn10);
                                                    }
                                                    if (cstmt01.getMoreResults()) {
                                                        rs11 = cstmt01.getResultSet();
                                                        while (rs11.next()) {
                                                            objRtn11 = new PX040S01A720ResultSet11();
                                                            objRtn11.fileA1692.CCIA = rs11.getString("CCIA");
                                                            objRtn11.fileA1692.FORMA = rs11.getString("FORMA");
                                                            objRtn11.fileA1692.SERIE = rs11.getString("SERIE");
                                                            objRtn11.fileA1692.CUPON = rs11.getString("CUPON");
                                                            objRtn11.fileA1692.SEQ = rs11.getString("SEQ");
                                                            objRtn11.fileA1692.SEQRO =  "00"; // = rs11.getString("SEQRO");
                                                            objRtn11.fileA1692.CDEPART = rs11.getString("CDEPART");
                                                            objRtn11.fileA1692.CARRIVA = rs11.getString("CARRIVA");
                                                            objRtn11.fileA1692.CARR = rs11.getString("CARR");
                                                            objRtn11.fileA1692.NFLIGHT = rs11.getString("NFLIGHT");
                                                            objRtn11.fileA1692.DFLIGHT = rs11.getString("DFLIGHT");
                                                            objRtn11.fileA1692.CLAS = rs11.getString("CLAS");
                                                            objRtn11.fileA1692.FBASE = rs11.getString("FBASE");
                                                            objRtn11.fileA1692.VCPN = rs11.getDouble("VCPN");
                                                            objRtn11.fileA1692.MDACP = rs11.getString("MDACP");
                                                            objRtn11.fileA1692.COMISI = rs11.getDouble("ISC");
                                                            //objRtn11.fileA1692.VTAX = rs11.getDouble("TAX");
                                                            //objRtn11.fileA1692.VYQ = rs11.getDouble("YQ");
                                                            objRtn11.fileA1692.FVTA = rs11.getString("FVTA");
                                                            filter.lstResultSet11.add(objRtn11);
                                                        }
                                                        if (cstmt01.getMoreResults()) {
                                                            rs12 = cstmt01.getResultSet();
                                                            while (rs12.next()) {
                                                                objRtn12 = new PX040S01A720ResultSet12();
                                                                objRtn12.fileA1818.CCIA = rs12.getString("CCIA");
                                                                objRtn12.fileA1818.FORMA = rs12.getString("FORMA");
                                                                objRtn12.fileA1818.SERIE = rs12.getString("SERIE");
                                                                objRtn12.fileA1818.CUPON = rs12.getString("CUPON");
                                                                objRtn12.fileA1818.SEQ = rs12.getString("SEQ");
                                                                objRtn12.fileA1818.SEQRO = rs12.getString("SEQRO");
                                                                objRtn12.fileA1818.CDEPART = rs12.getString("CDEPART");
                                                                objRtn12.fileA1818.CARRIVA = rs12.getString("CARRIVA");
                                                                objRtn12.fileA1818.CARR = rs12.getString("CARR");
                                                                objRtn12.fileA1818.NFLIGHT = rs12.getString("NFLIGHT");
                                                                objRtn12.fileA1818.DFLIGHT = rs12.getString("DFLIGHT");
                                                                objRtn12.fileA1818.CLAS = rs12.getString("CLAS");
                                                                objRtn12.fileA1818.FBASE = rs12.getString("FBASE");
                                                                objRtn12.fileA1818.VCPN = rs12.getDouble("VCPN");
                                                                objRtn12.fileA1818.MDACP = rs12.getString("MDACP");
                                                                filter.lstResultSet12.add(objRtn12);
                                                            }
                                                            if (cstmt01.getMoreResults()) {
                                                                rs13 = cstmt01.getResultSet();
                                                                while (rs13.next()) {
                                                                    objRtn13 = new PX040S01A720ResultSet13();
                                                                    objRtn13.fileA1200.CCIA = rs13.getString("CCIA");
                                                                    objRtn13.fileA1200.FORMA = rs13.getString("FORMA");
                                                                    objRtn13.fileA1200.SERIE = rs13.getString("SERIE");
                                                                    objRtn13.fileA1200.CUPON = rs13.getString("CUPON");
                                                                    objRtn13.fileA1200.SEQ = rs13.getString("SEQ");
                                                                    objRtn13.fileA1200.RUTA_FROM = rs13.getString("RUTA_FROM");
                                                                    objRtn13.fileA1200.RUTA_TO = rs13.getString("RUTA_TO");
                                                                    objRtn13.fileA1200.CARR = rs13.getString("CARR");
                                                                    
                                                                    //ISR
                                                                    try{
                                                                        objRtn13.fileA1200.FECR = rs13.getString("FLIGHT");
                                                                    }catch(SQLException ex){
                                                                        //No es ISR
                                                                    }
                                                                    
                                                                    objRtn13.fileA1200.DFLIGHT = rs13.getString("DFLIGHT");
                                                                    objRtn13.fileA1200.FBASIS = rs13.getString("FBASIS");
                                                                    objRtn13.fileA1200.GROSS = rs13.getDouble("GROSS");
                                                                    objRtn13.fileA1200.CURRENC = rs13.getString("CURRENC");
                                                                    objRtn13.fileA1200.STVAL = rs13.getString("STAT");
                                                                    objRtn13.fileA1200.TAX = rs13.getDouble("TAX");
                                                                    objRtn13.fileA1200.ISC = rs13.getDouble("ISC");
                                                                    //objRtn13.fileA1200.YQ = rs13.getDouble("YQ");
                                                                    objRtn13.fileA1200.FSALE = rs13.getString("FVTA");
                                                                    filter.lstResultSet13.add(objRtn13);
                                                                }
                                                                if (cstmt01.getMoreResults()) {
                                                                    rs14 = cstmt01.getResultSet();
                                                                    while (rs14.next()) {
                                                                        objRtn14 = new PX040S01A720ResultSet14();
                                                                        objRtn14.fileA2033.CIA = rs14.getString("CIA");
                                                                        objRtn14.fileA2033.FORMA = rs14.getString("FORMA");
                                                                        objRtn14.fileA2033.SERIE = rs14.getString("SERIE");
                                                                        objRtn14.fileA2033.CUPON = rs14.getString("CUPON");
                                                                        objRtn14.fileA2033.SEQ = rs14.getString("SEQ");
                                                                        objRtn14.fileA2033.RUTA_FROM = rs14.getString("RUTA_FROM");
                                                                        objRtn14.fileA2033.RUTA_TO = rs14.getString("RUTA_TO");
                                                                        objRtn14.fileA2033.CARR = rs14.getString("CARR");
                                                                        objRtn14.fileA2033.DFLIGHT = rs14.getString("DFLIGHT");
                                                                        objRtn14.fileA2033.FBASIS = rs14.getString("FBASIS");
                                                                        objRtn14.fileA2033.GROSS = rs14.getDouble("GROSS");
                                                                        objRtn14.fileA2033.CURRENC = rs14.getString("CURRENC");
                                                                        objRtn14.fileA2033.TRNC = rs14.getString("TRNC");
                                                                        objRtn14.fileA2033.TTRAX = rs14.getInt("TTRAX");
                                                                        objRtn14.fileA2033.CORRL = rs14.getInt("CORRL");
                                                                        objRtn14.fileA2033.ESTADO = rs14.getString("ESTADO");
                                                                        objRtn14.fileA2033.TTRANS = rs14.getInt("TTRANS");
                                                                        objRtn14.fileA2033.ESTTRX = rs14.getString("ESTTRX");
                                                                        filter.lstResultSet14.add(objRtn14);
                                                                    }
                                                                    if (cstmt01.getMoreResults()) {
                                                                        rs15 = cstmt01.getResultSet();
                                                                        while (rs15.next()) {
                                                                            objRtn15 = new PX040S01A720ResultSet15();
                                                                            objRtn15.fileA1747.CCIA = rs15.getString("CCIA");
                                                                            objRtn15.fileA1747.FORMA = rs15.getString("FORMA");
                                                                            objRtn15.fileA1747.SERIE = rs15.getString("SERIE");
                                                                            objRtn15.fileA1747.CUPON = rs15.getString("CUPON");
                                                                            objRtn15.fileA1747.CDEPART = rs15.getString("CDEPART");
                                                                            objRtn15.fileA1747.CARRIVA = rs15.getString("CARRIVA");
                                                                            objRtn15.fileA1747.CARR = rs15.getString("CARR");
                                                                            objRtn15.fileA1747.NFLIGHT = rs15.getString("NFLIGHT");
                                                                            objRtn15.fileA1747.DFLIGHT = rs15.getString("DFLIGHT");
                                                                            objRtn15.fileA1747.CLAS = rs15.getString("CLAS");
                                                                            objRtn15.fileA1747.FBASE = rs15.getString("FBASE");
                                                                            objRtn15.fileA1747.VCPN = rs15.getDouble("VCPN");
                                                                            objRtn15.fileA1747.MDACP = rs15.getString("MDACP");
                                                                            filter.lstResultSet15.add(objRtn15);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                //</editor-fold>
            }
            
        } catch (SQLException ex) {
            String err = ex.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
        } catch (Exception ex) {
            String err = ex.getMessage();
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
        } finally {
            //<editor-fold defaultstate="collapsed" desc="{...} Finally">
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs02 != null) {
                rs02.close();
            }
            if (rs03 != null) {
                rs03.close();
            }
            if (rs04 != null) {
                rs04.close();
            }
            if (rs05 != null) {
                rs05.close();
            }
            if (rs06 != null) {
                rs06.close();
            }
            if (rs07 != null) {
                rs07.close();
            }
            if (rs08 != null) {
                rs08.close();
            }
            if (rs09 != null) {
                rs09.close();
            }
            if (rs10 != null) {
                rs10.close();
            }
            if (rs11 != null) {
                rs11.close();
            }
            if (rs13 != null) {
                rs13.close();
            }
            if (rs14 != null) {
                rs14.close();
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
            //</editor-fold>
        }
        return filter;
    }
}
