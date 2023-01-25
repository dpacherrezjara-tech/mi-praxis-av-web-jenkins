package net.miatech.praxis.dao.program;

//<editor-fold defaultstate="collapsed" desc="import">
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.PRORATEFilter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A720;
import net.miatech.praxis.BSPF104;
import net.miatech.praxis.BSPF63;
import net.miatech.praxis.classes.App;
import net.miatech.utils.AS400Map;
import net.miatech.utils.Functions;
import net.miatech.utils.Util;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class ProrrateoNewDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProrrateoNewDAO() {
    }

    public ProrrateoNewDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    //Para Búsqueda de Facsimil
    // =========================================================================
    public FACSIMILFilter loadBSPFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null, rst3 = null;
        PreparedStatement stmt = null;
        PreparedStatement stmt2 = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<BSPF63>();
        List<String> lstTaxes = new ArrayList<String>();
        List<String> lstReg46Restrict = new ArrayList<String>();
        List<String> lstReg46OrigIssue = new ArrayList<String>();
        List<String> lstFC = new ArrayList<String>();
        List<String> lstFOP = new ArrayList<String>();
        BSPF63 reg63;
        String strConj = "";
        String strSQLUSO = "";
        String strSQLLEG = "";
        String OU_SEQ = "";
        String OU_NROID = "";

        Connection cnx = null;
        try {
            //String strSQL = "{CALL " + session.getMainLibrary() + ".PXBSPFACSIMILNEW(?)}";
            String strSQL = "{CALL PXBSPFACSIMILNEW(?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(2, Types.CHAR);
            cs.registerOutParameter(3, Types.CHAR);

            cs.setString(1, filter.TDNR.trim());
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "BSP";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            OU_SEQ = cs.getString(2);
            if (OU_SEQ.equals("220")) {
                OU_NROID = cs.getString(3);
                session.getCNXIBMDB2().openSystem();
                ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
                try {
                    App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                    String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/PRO10468.PGM";

                    //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                    AS400Map mapping = new AS400Map();

                    //<editor-fold defaultstate="collapsed" desc="{...} 01 RECEIVING_DATA_IN    ">
                    AS400DataType[] RECEIVING_DATA_IN = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_IN      ">
                    class IDX_RECEIVING_IN {

                        static final int LK_CIA = 0;
                        static final int LK_FORMA = 1;
                        static final int LK_SERIE = 2;
                        static final int LK_FILL = 3;
                        static final int LK_IDFILE = 4;
                    }
                    AS400DataType[] RECEIVING_IN = new AS400DataType[5];
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_CIA] = mapping.Char(3);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_FORMA] = mapping.Char(4);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_SERIE] = mapping.Char(6);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_FILL] = mapping.Char(2);
                    RECEIVING_IN[IDX_RECEIVING_IN.LK_IDFILE] = mapping.Char(9);
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="{...} 01 RECEIVING_DATA_9879  ">
                    AS400DataType[] RECEIVING_DATA_9879 = new AS400DataType[3];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_I_9879  ">
                    class IDX_RECEIVING_I_9879 {

                        static final int LK_CIA = 0;
                        static final int LK_FORMA = 1;
                        static final int LK_SERIE = 2;
                        static final int LK_FILL = 3;
                    }
                    AS400DataType[] RECEIVING_I_9879 = new AS400DataType[4];
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_CIA] = mapping.Char(3);
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_FORMA] = mapping.Char(4);
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_SERIE] = mapping.Char(6);
                    RECEIVING_I_9879[IDX_RECEIVING_I_9879.LK_FILL] = mapping.Char(2);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_IO_9879 ">
                    class IDX_RECEIVING_IO_9879 {

                        static final int LK_IDFILE = 0;
                        static final int LK_TRANSC = 1;
                        static final int LK_STSCNJ = 2;                         //(N= TKT UNICO,Y= CONJUNCION)
                        static final int LK_CNJPADRE = 3;
                        static final int LK_FINCNJ = 4;                         //(N= TKT UNICO,Y= CONJUNCION)
                        static final int LK_STSERR = 5;                         //(0= OK,1= ERROR)
                        static final int LK_COBERR = 6;
                        static final int LK_MSJERR = 7;
                    }
                    AS400DataType[] RECEIVING_IO_9879 = new AS400DataType[8];
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_IDFILE] = mapping.Char(9);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_TRANSC] = mapping.Char(6);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSCNJ] = mapping.Char(1);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_CNJPADRE] = mapping.Char(13);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_FINCNJ] = mapping.Char(1);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSERR] = mapping.Char(1);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_COBERR] = mapping.Char(6);
                    RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_MSJERR] = mapping.Char(80);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}    02 RECEIVING_O_9879  ">
                    AS400DataType[] RECEIVING_O_9879 = new AS400DataType[16];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKT06       ">
                    class IDX_LK_BKT06 {

                        static final int R06_SMSG = 0;
                        static final int R06_SQNR = 1;
                        static final int R06_STNQ = 2;
                        static final int R06_TRNN = 3;
                        static final int R06_NRID = 4;
                        static final int R06_TREC = 5;
                        static final int R06_TACN = 6;
                        static final int R06_CARF = 7;
                        static final int R06_CSTF = 8;
                        static final int R06_RPSI = 9;
                        static final int R06_ESAC = 10;
                        static final int R06_DISI = 11;
                        static final int R06_NRMI = 12;
                        static final int R06_NRCT = 13;
                        static final int R06_AREI = 14;
                        static final int R06_RESD = 15;
                    }
                    AS400DataType[] LK_BKT06 = new AS400DataType[16];
                    LK_BKT06[IDX_LK_BKT06.R06_SMSG] = mapping.Char(3);
                    LK_BKT06[IDX_LK_BKT06.R06_SQNR] = mapping.Numeric(8, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_STNQ] = mapping.Numeric(2, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_TRNN] = mapping.Numeric(6, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_NRID] = mapping.Char(2);
                    LK_BKT06[IDX_LK_BKT06.R06_TREC] = mapping.Numeric(3, 0);
                    LK_BKT06[IDX_LK_BKT06.R06_TACN] = mapping.Char(3);
                    LK_BKT06[IDX_LK_BKT06.R06_CARF] = mapping.Char(10);
                    LK_BKT06[IDX_LK_BKT06.R06_CSTF] = mapping.Char(27);
                    LK_BKT06[IDX_LK_BKT06.R06_RPSI] = mapping.Char(4);
                    LK_BKT06[IDX_LK_BKT06.R06_ESAC] = mapping.Char(14);
                    LK_BKT06[IDX_LK_BKT06.R06_DISI] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_NRMI] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_NRCT] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_AREI] = mapping.Char(1);
                    LK_BKT06[IDX_LK_BKT06.R06_RESD] = mapping.Char(50);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS24       ">
                    class IDX_LK_BKS24 {

                        static final int R24_SMSG = 0;
                        static final int R24_SQNR = 1;
                        static final int R24_STNQ = 2;
                        static final int R24_DAIS = 3;
                        static final int R24_TRNN = 4;
                        static final int R24_TDNR = 5;
                        static final int R24_CDGT = 6;
                        static final int R24_CPUI = 7;
                        static final int R24_CJCP = 8;
                        static final int R24_AGTN = 9;
                        static final int R24_RFIC = 10;
                        static final int R24_TOUR = 11;
                        static final int R24_TRNC = 12;
                        static final int R24_TODC = 13;
                        static final int R24_PNRR = 14;
                        static final int R24_TIIS = 15;
                        static final int R24_RESD = 16;
                    }
                    AS400DataType[] LK_BKS24 = new AS400DataType[17];
                    LK_BKS24[IDX_LK_BKS24.R24_SMSG] = mapping.Char(3);
                    LK_BKS24[IDX_LK_BKS24.R24_SQNR] = mapping.Numeric(8, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_STNQ] = mapping.Numeric(2, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_DAIS] = mapping.Numeric(6, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_TRNN] = mapping.Numeric(6, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_TDNR] = mapping.Char(14);
                    LK_BKS24[IDX_LK_BKS24.R24_CDGT] = mapping.Numeric(1, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_CPUI] = mapping.Char(4);
                    LK_BKS24[IDX_LK_BKS24.R24_CJCP] = mapping.Char(3);
                    LK_BKS24[IDX_LK_BKS24.R24_AGTN] = mapping.Numeric(8, 0);
                    LK_BKS24[IDX_LK_BKS24.R24_RFIC] = mapping.Char(1);
                    LK_BKS24[IDX_LK_BKS24.R24_TOUR] = mapping.Char(15);
                    LK_BKS24[IDX_LK_BKS24.R24_TRNC] = mapping.Char(4);
                    LK_BKS24[IDX_LK_BKS24.R24_TODC] = mapping.Char(10);
                    LK_BKS24[IDX_LK_BKS24.R24_PNRR] = mapping.Char(13);
                    LK_BKS24[IDX_LK_BKS24.R24_TIIS] = mapping.Char(4);
                    LK_BKS24[IDX_LK_BKS24.R24_RESD] = mapping.Char(34);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS30       ">
                    AS400DataType[] LK_BKS30 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC30     ">
                    class IDX_LO_RC30 {

                        static final int R30_SMSG = 0;
                        static final int R30_SQNR = 1;
                        static final int R30_STNQ = 2;
                        static final int R30_DAIS = 3;
                        static final int R30_TRNN = 4;
                        static final int R30_TDNR = 5;
                        static final int R30_CDGT = 6;
                        static final int R30_COBL = 7;
                        static final int R30_NTFA = 8;
                        static final int R30_TMFT1 = 9;
                        static final int R30_TMFA1 = 10;
                        static final int R30_TMFT2 = 11;
                        static final int R30_TMFA2 = 12;
                        static final int R30_TMFT3 = 13;
                        static final int R30_TMFA3 = 14;
                        static final int R30_TDAM = 15;
                        static final int R30_RESD = 16;
                        static final int R30_CUTP = 17;
                    }
                    AS400DataType[] LO_RC30 = new AS400DataType[18];
                    LO_RC30[IDX_LO_RC30.R30_SMSG] = mapping.Char(3);
                    LO_RC30[IDX_LO_RC30.R30_SQNR] = mapping.Numeric(8, 0);
                    LO_RC30[IDX_LO_RC30.R30_STNQ] = mapping.Numeric(2, 0);
                    LO_RC30[IDX_LO_RC30.R30_DAIS] = mapping.Numeric(6, 0);
                    LO_RC30[IDX_LO_RC30.R30_TRNN] = mapping.Numeric(6, 0);
                    LO_RC30[IDX_LO_RC30.R30_TDNR] = mapping.Char(14);
                    LO_RC30[IDX_LO_RC30.R30_CDGT] = mapping.Numeric(1, 0);
                    LO_RC30[IDX_LO_RC30.R30_COBL] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_NTFA] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TMFT1] = mapping.Char(8);
                    LO_RC30[IDX_LO_RC30.R30_TMFA1] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TMFT2] = mapping.Char(8);
                    LO_RC30[IDX_LO_RC30.R30_TMFA2] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TMFT3] = mapping.Char(8);
                    LO_RC30[IDX_LO_RC30.R30_TMFA3] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_TDAM] = mapping.Numeric(11, 2, true);
                    LO_RC30[IDX_LO_RC30.R30_RESD] = mapping.Char(2);
                    LO_RC30[IDX_LO_RC30.R30_CUTP] = mapping.Char(4);

                    LK_BKS30[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC30)), 15);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS39       ">
                    AS400DataType[] LK_BKS39 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC39     ">
                    class IDX_LO_RC39 {

                        static final int R39_SMSG = 0;
                        static final int R39_SQNR = 1;
                        static final int R39_STNQ = 2;
                        static final int R39_DAIS = 3;
                        static final int R39_TRNN = 4;
                        static final int R39_TDNR = 5;
                        static final int R39_CDGT = 6;
                        static final int R39_STAT = 7;
                        static final int R39_COTP = 8;
                        static final int R39_CORT = 9;
                        static final int R39_COAM = 10;
                        static final int R39_SPTP = 11;
                        static final int R39_SPRT = 12;
                        static final int R39_SPAM = 13;
                        static final int R39_EFRT = 14;
                        static final int R39_EFCO = 15;
                        static final int R39_APBC = 16;
                        static final int R39_RDII = 17;
                        static final int R39_RESD = 18;
                        static final int R39_CUTP = 19;
                    }
                    AS400DataType[] LO_RC39 = new AS400DataType[20];
                    LO_RC39[IDX_LO_RC39.R39_SMSG] = mapping.Char(3);
                    LO_RC39[IDX_LO_RC39.R39_SQNR] = mapping.Numeric(8, 0);
                    LO_RC39[IDX_LO_RC39.R39_STNQ] = mapping.Numeric(2, 0);
                    LO_RC39[IDX_LO_RC39.R39_DAIS] = mapping.Numeric(6, 0);
                    LO_RC39[IDX_LO_RC39.R39_TRNN] = mapping.Numeric(6, 0);
                    LO_RC39[IDX_LO_RC39.R39_TDNR] = mapping.Char(14);
                    LO_RC39[IDX_LO_RC39.R39_CDGT] = mapping.Numeric(1, 0);
                    LO_RC39[IDX_LO_RC39.R39_STAT] = mapping.Char(3);
                    LO_RC39[IDX_LO_RC39.R39_COTP] = mapping.Char(6);
                    LO_RC39[IDX_LO_RC39.R39_CORT] = mapping.Numeric(5, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_COAM] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_SPTP] = mapping.Char(6);
                    LO_RC39[IDX_LO_RC39.R39_SPRT] = mapping.Numeric(5, 0);
                    LO_RC39[IDX_LO_RC39.R39_SPAM] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_EFRT] = mapping.Numeric(5, 0);
                    LO_RC39[IDX_LO_RC39.R39_EFCO] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_APBC] = mapping.Numeric(11, 2, true);
                    LO_RC39[IDX_LO_RC39.R39_RDII] = mapping.Char(1);
                    LO_RC39[IDX_LO_RC39.R39_RESD] = mapping.Char(17);
                    LO_RC39[IDX_LO_RC39.R39_CUTP] = mapping.Char(4);

                    LK_BKS39[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC39)), 3);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS42       ">
                    AS400DataType[] LK_BKS42 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC42     ">
                    class IDX_LO_RC42 {

                        static final int R42_SMSG = 0;
                        static final int R42_SQNR = 1;
                        static final int R42_STNQ = 2;
                        static final int R42_DAIS = 3;
                        static final int R42_TRNN = 4;
                        static final int R42_TDNR = 5;
                        static final int R42_CDGT = 6;
                        static final int R42_TCTP1 = 7;
                        static final int R42_TOCA1 = 8;
                        static final int R42_TCTP2 = 9;
                        static final int R42_TOCA2 = 10;
                        static final int R42_TCTP3 = 11;
                        static final int R42_TOCA3 = 12;
                        static final int R42_TCTP4 = 13;
                        static final int R42_TOCA4 = 14;
                        static final int R42_RESD = 15;
                        static final int R42_CUTP = 16;
                    }
                    AS400DataType[] LO_RC42 = new AS400DataType[17];
                    LO_RC42[IDX_LO_RC42.R42_SMSG] = mapping.Char(3);
                    LO_RC42[IDX_LO_RC42.R42_SQNR] = mapping.Numeric(8, 0);
                    LO_RC42[IDX_LO_RC42.R42_STNQ] = mapping.Numeric(2, 0);
                    LO_RC42[IDX_LO_RC42.R42_DAIS] = mapping.Numeric(6, 0);
                    LO_RC42[IDX_LO_RC42.R42_TRNN] = mapping.Numeric(6, 0);
                    LO_RC42[IDX_LO_RC42.R42_TDNR] = mapping.Char(14);
                    LO_RC42[IDX_LO_RC42.R42_CDGT] = mapping.Numeric(1, 0);
                    LO_RC42[IDX_LO_RC42.R42_TCTP1] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA1] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_TCTP2] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA2] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_TCTP3] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA3] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_TCTP4] = mapping.Char(6);
                    LO_RC42[IDX_LO_RC42.R42_TOCA4] = mapping.Numeric(11, 2, true);
                    LO_RC42[IDX_LO_RC42.R42_RESD] = mapping.Char(24);
                    LO_RC42[IDX_LO_RC42.R42_CUTP] = mapping.Char(4);

                    LK_BKS42[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC42)), 3);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS45       ">
                    AS400DataType[] LK_BKS45 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC45     ">
                    class IDX_LO_RC45 {

                        static final int R45_SMSG = 0;
                        static final int R45_SQNR = 1;
                        static final int R45_STNQ = 2;
                        static final int R45_RMED = 3;
                        static final int R45_TRNN = 4;
                        static final int R45_RTDN = 5;
                        static final int R45_CDGT = 6;
                        static final int R45_WAVR = 7;
                        static final int R45_RMIC = 8;
                        static final int R45_RCPN = 9;
                        static final int R45_DIRD = 10;
                        static final int R45_RESD = 11;
                    }
                    AS400DataType[] LO_RC45 = new AS400DataType[12];
                    LO_RC45[IDX_LO_RC45.R45_SMSG] = mapping.Char(3);
                    LO_RC45[IDX_LO_RC45.R45_SQNR] = mapping.Numeric(8, 0);
                    LO_RC45[IDX_LO_RC45.R45_STNQ] = mapping.Numeric(2, 0);
                    LO_RC45[IDX_LO_RC45.R45_RMED] = mapping.Char(6);
                    LO_RC45[IDX_LO_RC45.R45_TRNN] = mapping.Char(6);
                    LO_RC45[IDX_LO_RC45.R45_RTDN] = mapping.Char(14);
                    LO_RC45[IDX_LO_RC45.R45_CDGT] = mapping.Numeric(1, 0);
                    LO_RC45[IDX_LO_RC45.R45_WAVR] = mapping.Char(14);
                    LO_RC45[IDX_LO_RC45.R45_RMIC] = mapping.Char(5);
                    LO_RC45[IDX_LO_RC45.R45_RCPN] = mapping.Numeric(4, 0);
                    LO_RC45[IDX_LO_RC45.R45_DIRD] = mapping.Numeric(6, 0);
                    LO_RC45[IDX_LO_RC45.R45_RESD] = mapping.Char(67);

                    LK_BKS45[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC45)), 20);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKS46       ">
                    AS400DataType[] LK_BKS46 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC46     ">
                    class IDX_LO_RC46 {

                        static final int R46_SMSG = 0;
                        static final int R46_SQNR = 1;
                        static final int R46_STNQ = 2;
                        static final int R46_DAIS = 3;
                        static final int R46_TRNN = 4;
                        static final int R46_TDNR = 5;
                        static final int R46_CDGT = 6;
                        static final int R46_ORIT = 7;
                        static final int R46_ORIL = 8;
                        static final int R46_ORID = 9;
                        static final int R46_ORIA = 10;
                        static final int R46_ENRS = 11;
                        static final int R46_RESD = 12;
                    }
                    AS400DataType[] LO_RC46 = new AS400DataType[13];
                    LO_RC46[IDX_LO_RC46.R46_SMSG] = mapping.Char(3);
                    LO_RC46[IDX_LO_RC46.R46_SQNR] = mapping.Numeric(8, 0);
                    LO_RC46[IDX_LO_RC46.R46_STNQ] = mapping.Numeric(2, 0);
                    LO_RC46[IDX_LO_RC46.R46_DAIS] = mapping.Numeric(6, 0);
                    LO_RC46[IDX_LO_RC46.R46_TRNN] = mapping.Numeric(6, 0);
                    LO_RC46[IDX_LO_RC46.R46_TDNR] = mapping.Char(14);
                    LO_RC46[IDX_LO_RC46.R46_CDGT] = mapping.Numeric(1, 0);
                    LO_RC46[IDX_LO_RC46.R46_ORIT] = mapping.Char(14);
                    LO_RC46[IDX_LO_RC46.R46_ORIL] = mapping.Char(3);
                    LO_RC46[IDX_LO_RC46.R46_ORID] = mapping.Char(7);
                    LO_RC46[IDX_LO_RC46.R46_ORIA] = mapping.Char(8);
                    LO_RC46[IDX_LO_RC46.R46_ENRS] = mapping.Char(49);
                    LO_RC46[IDX_LO_RC46.R46_RESD] = mapping.Char(15);

                    LK_BKS46[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC46)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKI63       ">
                    AS400DataType[] LK_BKI63 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC63     ">
                    class IDX_LO_RC63 {

                        static final int R63_SMSG = 0;
                        static final int R63_SQNR = 1;
                        static final int R63_STNQ = 2;
                        static final int R63_DAIS = 3;
                        static final int R63_TRNN = 4;
                        static final int R63_TDNR = 5;
                        static final int R63_CDGT = 6;
                        static final int R63_SEGI = 7;
                        static final int R63_STPO = 8;
                        static final int R63_NBDA = 9;
                        static final int R63_NADA = 10;
                        static final int R63_ORAC = 11;
                        static final int R63_DSTC = 12;
                        static final int R63_CARR = 13;
                        static final int R63_CABI = 14;
                        static final int R63_FTNR = 15;
                        static final int R63_RBKD = 16;
                        static final int R63_FTDA = 17;
                        static final int R63_FTDT = 18;
                        static final int R63_FBST = 19;
                        static final int R63_FBAL = 20;
                        static final int R63_FBTD = 21;
                        static final int R63_FFRF = 22;
                        static final int R63_FCPT = 23;
                        static final int R63_RESD = 24;
                    }
                    AS400DataType[] LO_RC63 = new AS400DataType[25];
                    LO_RC63[IDX_LO_RC63.R63_SMSG] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_SQNR] = mapping.Numeric(8, 0);
                    LO_RC63[IDX_LO_RC63.R63_STNQ] = mapping.Numeric(2, 0);
                    LO_RC63[IDX_LO_RC63.R63_DAIS] = mapping.Numeric(6, 0);
                    LO_RC63[IDX_LO_RC63.R63_TRNN] = mapping.Numeric(6, 0);
                    LO_RC63[IDX_LO_RC63.R63_TDNR] = mapping.Char(14);
                    LO_RC63[IDX_LO_RC63.R63_CDGT] = mapping.Numeric(1, 0);
                    LO_RC63[IDX_LO_RC63.R63_SEGI] = mapping.Numeric(1, 0);
                    LO_RC63[IDX_LO_RC63.R63_STPO] = mapping.Char(1);
                    LO_RC63[IDX_LO_RC63.R63_NBDA] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_NADA] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_ORAC] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_DSTC] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_CARR] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_CABI] = mapping.Char(1);
                    LO_RC63[IDX_LO_RC63.R63_FTNR] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_RBKD] = mapping.Char(2);
                    LO_RC63[IDX_LO_RC63.R63_FTDA] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_FTDT] = mapping.Char(5);
                    LO_RC63[IDX_LO_RC63.R63_FBST] = mapping.Char(2);
                    LO_RC63[IDX_LO_RC63.R63_FBAL] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_FBTD] = mapping.Char(15);
                    LO_RC63[IDX_LO_RC63.R63_FFRF] = mapping.Char(20);
                    LO_RC63[IDX_LO_RC63.R63_FCPT] = mapping.Char(3);
                    LO_RC63[IDX_LO_RC63.R63_RESD] = mapping.Char(10);

                    LK_BKI63[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC63)), 4);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BAR64       ">
                    class IDX_LK_BAR64 {

                        static final int R64_SMSG = 0;
                        static final int R64_SQNR = 1;
                        static final int R64_STNQ = 2;
                        static final int R64_DAIS = 3;
                        static final int R64_TRNN = 4;
                        static final int R64_TDNR = 5;
                        static final int R64_CDGT = 6;
                        static final int R64_FARE = 7;
                        static final int R64_TKMI = 8;
                        static final int R64_EQFR = 9;
                        static final int R64_TOTL = 10;
                        static final int R64_SASI = 11;
                        static final int R64_FCMI = 12;
                        static final int R64_BAID = 13;
                        static final int R64_BEOT = 14;
                        static final int R64_FCPI = 15;
                        static final int R64_TAXA1 = 16;
                        static final int R64_TAXA2 = 17;
                        static final int R64_TAXA3 = 18;
                        static final int R64_RESD = 19;
                    }
                    AS400DataType[] LK_BAR64 = new AS400DataType[20];
                    LK_BAR64[IDX_LK_BAR64.R64_SMSG] = mapping.Char(3);
                    LK_BAR64[IDX_LK_BAR64.R64_SQNR] = mapping.Numeric(8, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_STNQ] = mapping.Numeric(2, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_DAIS] = mapping.Numeric(6, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_TRNN] = mapping.Numeric(6, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_TDNR] = mapping.Char(14);
                    LK_BAR64[IDX_LK_BAR64.R64_CDGT] = mapping.Numeric(1, 0);
                    LK_BAR64[IDX_LK_BAR64.R64_FARE] = mapping.Char(12);
                    LK_BAR64[IDX_LK_BAR64.R64_TKMI] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_EQFR] = mapping.Char(12);
                    LK_BAR64[IDX_LK_BAR64.R64_TOTL] = mapping.Char(12);
                    LK_BAR64[IDX_LK_BAR64.R64_SASI] = mapping.Char(4);
                    LK_BAR64[IDX_LK_BAR64.R64_FCMI] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_BAID] = mapping.Char(6);
                    LK_BAR64[IDX_LK_BAR64.R64_BEOT] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_FCPI] = mapping.Char(1);
                    LK_BAR64[IDX_LK_BAR64.R64_TAXA1] = mapping.Char(11);
                    LK_BAR64[IDX_LK_BAR64.R64_TAXA2] = mapping.Char(11);
                    LK_BAR64[IDX_LK_BAR64.R64_TAXA3] = mapping.Char(11);
                    LK_BAR64[IDX_LK_BAR64.R64_RESD] = mapping.Char(46);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 WS_BAR65       ">
                    class IDX_WS_BAR65 {

                        static final int R65_SMSG = 0;
                        static final int R65_SQNR = 1;
                        static final int R65_STNQ = 2;
                        static final int R65_DAIS = 3;
                        static final int R65_TRNN = 4;
                        static final int R65_TDNR = 5;
                        static final int R65_CDGT = 6;
                        static final int R65_PXNM = 7;
                        static final int R65_PXDA = 8;
                        static final int R65_DOBR = 9;
                        static final int R65_PXTP = 10;
                        static final int R65_RESD = 11;
                    }
                    AS400DataType[] WS_BAR65 = new AS400DataType[12];
                    WS_BAR65[IDX_WS_BAR65.R65_SMSG] = mapping.Char(3);
                    WS_BAR65[IDX_WS_BAR65.R65_SQNR] = mapping.Numeric(8, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_STNQ] = mapping.Numeric(2, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_DAIS] = mapping.Numeric(6, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_TRNN] = mapping.Numeric(6, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_TDNR] = mapping.Char(14);
                    WS_BAR65[IDX_WS_BAR65.R65_CDGT] = mapping.Numeric(1, 0);
                    WS_BAR65[IDX_WS_BAR65.R65_PXNM] = mapping.Char(49);
                    WS_BAR65[IDX_WS_BAR65.R65_PXDA] = mapping.Char(29);
                    WS_BAR65[IDX_WS_BAR65.R65_DOBR] = mapping.Char(7);
                    WS_BAR65[IDX_WS_BAR65.R65_PXTP] = mapping.Char(3);
                    WS_BAR65[IDX_WS_BAR65.R65_RESD] = mapping.Char(8);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BAR66       ">
                    AS400DataType[] LK_BAR66 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC66     ">
                    class IDX_LO_RC66 {

                        static final int R66_SMSG = 0;
                        static final int R66_SQNR = 1;
                        static final int R66_STNQ = 2;
                        static final int R66_DAIS = 3;
                        static final int R66_TRNN = 4;
                        static final int R66_TDNR = 5;
                        static final int R66_CDGT = 6;
                        static final int R66_FPSN = 7;
                        static final int R66_FPIN = 8;
                        static final int R66_RESD = 9;
                    }
                    AS400DataType[] LO_RC66 = new AS400DataType[10];
                    LO_RC66[IDX_LO_RC66.R66_SMSG] = mapping.Char(3);
                    LO_RC66[IDX_LO_RC66.R66_SQNR] = mapping.Numeric(8, 0);
                    LO_RC66[IDX_LO_RC66.R66_STNQ] = mapping.Numeric(2, 0);
                    LO_RC66[IDX_LO_RC66.R66_DAIS] = mapping.Numeric(6, 0);
                    LO_RC66[IDX_LO_RC66.R66_TRNN] = mapping.Numeric(6, 0);
                    LO_RC66[IDX_LO_RC66.R66_TDNR] = mapping.Char(14);
                    LO_RC66[IDX_LO_RC66.R66_CDGT] = mapping.Numeric(1, 0);
                    LO_RC66[IDX_LO_RC66.R66_FPSN] = mapping.Numeric(1, 0);
                    LO_RC66[IDX_LO_RC66.R66_FPIN] = mapping.Char(50);
                    LO_RC66[IDX_LO_RC66.R66_RESD] = mapping.Char(45);

                    LK_BAR66[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC66)), 6);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 WS_REC75       ">
                    AS400DataType[] WS_REC75 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC75     ">
                    class IDX_LO_RC75 {

                        static final int R75_SMSG = 0;
                        static final int R75_SQNR = 1;
                        static final int R75_STNQ = 2;
                        static final int R75_DAIS = 3;
                        static final int R75_TRNN = 4;
                        static final int R75_TDNR = 5;
                        static final int R75_CDGT = 6;
                        static final int R75_EMCP = 7;
                        static final int R75_EMCV = 8;
                        static final int R75_EMRT = 9;
                        static final int R75_EMRC = 10;
                        static final int R75_EMST = 11;
                        static final int R75_EMSC = 12;
                        static final int R75_EMOC = 13;
                        static final int R75_XBOA = 14;
                        static final int R75_XBCT = 15;
                        static final int R75_XBRU = 16;
                        static final int R75_XBNE = 17;
                        static final int R75_EMCI = 18;
                        static final int R75_EMNS = 19;
                        static final int R75_EMCR = 20;
                        static final int R75_EMAG = 21;
                        static final int R75_EMSG = 22;
                        static final int R75_EMIC = 23;
                        static final int R75_RESD = 24;
                        static final int R75_CUTP = 25;
                    }
                    AS400DataType[] LO_RC75 = new AS400DataType[26];
                    LO_RC75[IDX_LO_RC75.R75_SMSG] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_SQNR] = mapping.Numeric(8, 0);
                    LO_RC75[IDX_LO_RC75.R75_STNQ] = mapping.Numeric(2, 0);
                    LO_RC75[IDX_LO_RC75.R75_DAIS] = mapping.Numeric(6, 0);
                    LO_RC75[IDX_LO_RC75.R75_TRNN] = mapping.Numeric(6, 0);
                    LO_RC75[IDX_LO_RC75.R75_TDNR] = mapping.Char(14);
                    LO_RC75[IDX_LO_RC75.R75_CDGT] = mapping.Numeric(1, 0);
                    LO_RC75[IDX_LO_RC75.R75_EMCP] = mapping.Numeric(1, 0);
                    LO_RC75[IDX_LO_RC75.R75_EMCV] = mapping.Numeric(11, 2, true);
                    LO_RC75[IDX_LO_RC75.R75_EMRT] = mapping.Char(14);
                    LO_RC75[IDX_LO_RC75.R75_EMRC] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_EMST] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_EMSC] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMOC] = mapping.Char(2);
                    LO_RC75[IDX_LO_RC75.R75_XBOA] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_XBCT] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_XBRU] = mapping.Char(12);
                    LO_RC75[IDX_LO_RC75.R75_XBNE] = mapping.Char(12);
                    LO_RC75[IDX_LO_RC75.R75_EMCI] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_EMNS] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMCR] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMAG] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMSG] = mapping.Char(3);
                    LO_RC75[IDX_LO_RC75.R75_EMIC] = mapping.Char(1);
                    LO_RC75[IDX_LO_RC75.R75_RESD] = mapping.Char(16);
                    LO_RC75[IDX_LO_RC75.R75_CUTP] = mapping.Char(4);

                    WS_REC75[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC75)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BMD76       ">
                    AS400DataType[] LK_BMD76 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC76     ">
                    class IDX_LO_RC76 {

                        static final int R76_SMSG = 0;
                        static final int R76_SQNR = 1;
                        static final int R76_STNQ = 2;
                        static final int R76_DAIS = 3;
                        static final int R76_TRNN = 4;
                        static final int R76_TDNR = 5;
                        static final int R76_CDGT = 6;
                        static final int R76_EMCP = 7;
                        static final int R76_EMRM = 8;
                        static final int R76_RESD = 9;
                    }
                    AS400DataType[] LO_RC76 = new AS400DataType[10];
                    LO_RC76[IDX_LO_RC76.R76_SMSG] = mapping.Char(3);
                    LO_RC76[IDX_LO_RC76.R76_SQNR] = mapping.Numeric(8, 0);
                    LO_RC76[IDX_LO_RC76.R76_STNQ] = mapping.Numeric(2, 0);
                    LO_RC76[IDX_LO_RC76.R76_DAIS] = mapping.Numeric(6, 0);
                    LO_RC76[IDX_LO_RC76.R76_TRNN] = mapping.Numeric(6, 0);
                    LO_RC76[IDX_LO_RC76.R76_TDNR] = mapping.Char(14);
                    LO_RC76[IDX_LO_RC76.R76_CDGT] = mapping.Numeric(1, 0);
                    LO_RC76[IDX_LO_RC76.R76_EMCP] = mapping.Numeric(1, 0);
                    LO_RC76[IDX_LO_RC76.R76_EMRM] = mapping.Char(70);
                    LO_RC76[IDX_LO_RC76.R76_RESD] = mapping.Char(25);

                    LK_BMD76[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC76)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKF81       ">
                    AS400DataType[] LK_BKF81 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC81     ">
                    class IDX_LO_RC81 {

                        static final int R81_SMSG = 0;
                        static final int R81_SQNR = 1;
                        static final int R81_STNQ = 2;
                        static final int R81_DAIS = 3;
                        static final int R81_TRNN = 4;
                        static final int R81_TDNR = 5;
                        static final int R81_CDGT = 6;
                        static final int R81_FRCS = 7;
                        static final int R81_FRCA = 8;
                        static final int R81_RESD = 9;
                    }
                    AS400DataType[] LO_RC81 = new AS400DataType[10];
                    LO_RC81[IDX_LO_RC81.R81_SMSG] = mapping.Char(3);
                    LO_RC81[IDX_LO_RC81.R81_SQNR] = mapping.Numeric(8, 0);
                    LO_RC81[IDX_LO_RC81.R81_STNQ] = mapping.Numeric(2, 0);
                    LO_RC81[IDX_LO_RC81.R81_DAIS] = mapping.Numeric(6, 0);
                    LO_RC81[IDX_LO_RC81.R81_TRNN] = mapping.Numeric(6, 0);
                    LO_RC81[IDX_LO_RC81.R81_TDNR] = mapping.Char(14);
                    LO_RC81[IDX_LO_RC81.R81_CDGT] = mapping.Numeric(1, 0);
                    LO_RC81[IDX_LO_RC81.R81_FRCS] = mapping.Numeric(1, 0);
                    LO_RC81[IDX_LO_RC81.R81_FRCA] = mapping.Char(87);
                    LO_RC81[IDX_LO_RC81.R81_RESD] = mapping.Char(8);

                    LK_BKF81[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC81)), 5);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_BKP84       ">
                    AS400DataType[] LK_BKP84 = new AS400DataType[1];
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}          07 LO_RC84     ">
                    class IDX_LO_RC84 {

                        static final int R84_SMSG = 0;
                        static final int R84_SQNR = 1;
                        static final int R84_STNQ = 2;
                        static final int R84_DAIS = 3;
                        static final int R84_TRNN = 4;
                        static final int R84_FPTP = 5;
                        static final int R84_FPAM = 6;
                        static final int R84_FPAC = 7;
                        static final int R84_EXDA = 8;
                        static final int R84_EXPC = 9;
                        static final int R84_APLC = 10;
                        static final int R84_INVN = 11;
                        static final int R84_INVD = 12;
                        static final int R84_REMT = 13;
                        static final int R84_CVVR = 14;
                        static final int R84_RESD = 15;
                        static final int R84_CUTP = 16;
                    }
                    AS400DataType[] LO_RC84 = new AS400DataType[17];
                    LO_RC84[IDX_LO_RC84.R84_SMSG] = mapping.Char(3);
                    LO_RC84[IDX_LO_RC84.R84_SQNR] = mapping.Numeric(8, 0);
                    LO_RC84[IDX_LO_RC84.R84_STNQ] = mapping.Numeric(2, 0);
                    LO_RC84[IDX_LO_RC84.R84_DAIS] = mapping.Numeric(6, 0);
                    LO_RC84[IDX_LO_RC84.R84_TRNN] = mapping.Numeric(6, 0);
                    LO_RC84[IDX_LO_RC84.R84_FPTP] = mapping.Char(10);
                    LO_RC84[IDX_LO_RC84.R84_FPAM] = mapping.Numeric(11, 2, true);
                    LO_RC84[IDX_LO_RC84.R84_FPAC] = mapping.Char(19);
                    LO_RC84[IDX_LO_RC84.R84_EXDA] = mapping.Char(4);
                    LO_RC84[IDX_LO_RC84.R84_EXPC] = mapping.Char(2);
                    LO_RC84[IDX_LO_RC84.R84_APLC] = mapping.Char(6);
                    LO_RC84[IDX_LO_RC84.R84_INVN] = mapping.Char(14);
                    LO_RC84[IDX_LO_RC84.R84_INVD] = mapping.Char(6);
                    LO_RC84[IDX_LO_RC84.R84_REMT] = mapping.Numeric(11, 2, true);
                    LO_RC84[IDX_LO_RC84.R84_CVVR] = mapping.Char(1);
                    LO_RC84[IDX_LO_RC84.R84_RESD] = mapping.Char(23);
                    LO_RC84[IDX_LO_RC84.R84_CUTP] = mapping.Char(4);

                    LK_BKP84[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RC84)), 6);
                    //</editor-fold>
                    //<editor-fold defaultstate="collapsed" desc="{...}       05 LK_AGTN        ">
                    AS400DataType[] LK_AGTN = new AS400DataType[1];
                    LK_AGTN[0] = mapping.Char(8);
                    //</editor-fold>

                    RECEIVING_DATA_IN[0] = mapping.Char(mapping.GetDimension(RECEIVING_IN));
                    AS400Structure structure = new AS400Structure(RECEIVING_DATA_IN);
                    AS400Structure structure00 = new AS400Structure(RECEIVING_IN);

                    int dim = mapping.GetDimension(RECEIVING_I_9879)
                            + mapping.GetDimension(RECEIVING_IO_9879)
                            + mapping.GetDimension(LK_BKT06)
                            + mapping.GetDimension(LK_BKS24)
                            + (mapping.GetDimension(LO_RC30) * mapping.getOccursSize(LK_BKS30[0]))
                            + (mapping.GetDimension(LO_RC39) * mapping.getOccursSize(LK_BKS39[0]))
                            + (mapping.GetDimension(LO_RC42) * mapping.getOccursSize(LK_BKS42[0]))
                            + (mapping.GetDimension(LO_RC45) * mapping.getOccursSize(LK_BKS45[0]))
                            + (mapping.GetDimension(LO_RC46) * mapping.getOccursSize(LK_BKS46[0]))
                            + (mapping.GetDimension(LO_RC63) * mapping.getOccursSize(LK_BKI63[0]))
                            + mapping.GetDimension(LK_BAR64)
                            + mapping.GetDimension(WS_BAR65)
                            + (mapping.GetDimension(LO_RC66) * mapping.getOccursSize(LK_BAR66[0]))
                            + (mapping.GetDimension(LO_RC75) * mapping.getOccursSize(WS_REC75[0]))
                            + (mapping.GetDimension(LO_RC76) * mapping.getOccursSize(LK_BMD76[0]))
                            + (mapping.GetDimension(LO_RC81) * mapping.getOccursSize(LK_BKF81[0]))
                            + (mapping.GetDimension(LO_RC84) * mapping.getOccursSize(LK_BKP84[0]))
                            + mapping.GetDimension(LK_AGTN);

                    RECEIVING_O_9879[0] = mapping.Char(mapping.GetDimension(LK_BKT06));
                    RECEIVING_O_9879[1] = mapping.Char(mapping.GetDimension(LK_BKS24));
                    RECEIVING_O_9879[2] = mapping.Char((mapping.GetDimension(LO_RC30) * mapping.getOccursSize(LK_BKS30[0])));
                    RECEIVING_O_9879[3] = mapping.Char((mapping.GetDimension(LO_RC39) * mapping.getOccursSize(LK_BKS39[0])));
                    RECEIVING_O_9879[4] = mapping.Char((mapping.GetDimension(LO_RC42) * mapping.getOccursSize(LK_BKS42[0])));
                    RECEIVING_O_9879[5] = mapping.Char((mapping.GetDimension(LO_RC45) * mapping.getOccursSize(LK_BKS45[0])));
                    RECEIVING_O_9879[6] = mapping.Char((mapping.GetDimension(LO_RC46) * mapping.getOccursSize(LK_BKS46[0])));
                    RECEIVING_O_9879[7] = mapping.Char((mapping.GetDimension(LO_RC63) * mapping.getOccursSize(LK_BKI63[0])));
                    RECEIVING_O_9879[8] = mapping.Char(mapping.GetDimension(LK_BAR64));
                    RECEIVING_O_9879[9] = mapping.Char(mapping.GetDimension(WS_BAR65));
                    RECEIVING_O_9879[10] = mapping.Char((mapping.GetDimension(LO_RC66) * mapping.getOccursSize(LK_BAR66[0])));
                    RECEIVING_O_9879[11] = mapping.Char((mapping.GetDimension(LO_RC75) * mapping.getOccursSize(WS_REC75[0])));
                    RECEIVING_O_9879[12] = mapping.Char((mapping.GetDimension(LO_RC76) * mapping.getOccursSize(LK_BMD76[0])));
                    RECEIVING_O_9879[13] = mapping.Char((mapping.GetDimension(LO_RC81) * mapping.getOccursSize(LK_BKF81[0])));
                    RECEIVING_O_9879[14] = mapping.Char((mapping.GetDimension(LO_RC84) * mapping.getOccursSize(LK_BKP84[0])));
                    RECEIVING_O_9879[15] = mapping.Char(mapping.GetDimension(LK_AGTN));

                    RECEIVING_DATA_9879[0] = mapping.Char(mapping.GetDimension(RECEIVING_I_9879));
                    RECEIVING_DATA_9879[1] = mapping.Char(mapping.GetDimension(RECEIVING_IO_9879));
                    RECEIVING_DATA_9879[2] = mapping.Char(mapping.GetDimension(RECEIVING_O_9879));

                    AS400Structure structure01 = new AS400Structure(RECEIVING_DATA_9879);
                    AS400Structure structure02 = new AS400Structure(RECEIVING_I_9879);
                    AS400Structure structure03 = new AS400Structure(RECEIVING_IO_9879);
                    AS400Structure structure04 = new AS400Structure(RECEIVING_O_9879);
                    AS400Structure structure05 = new AS400Structure(LK_BKT06);
                    AS400Structure structure06 = new AS400Structure(LK_BKS24);
                    AS400Structure structure07 = new AS400Structure(LK_BKS30);
                    AS400Structure structure08 = new AS400Structure(LO_RC30);
                    AS400Structure structure09 = new AS400Structure(LK_BKS39);
                    AS400Structure structure10 = new AS400Structure(LO_RC39);
                    AS400Structure structure11 = new AS400Structure(LK_BKS42);
                    AS400Structure structure12 = new AS400Structure(LO_RC42);
                    AS400Structure structure13 = new AS400Structure(LK_BKS45);
                    AS400Structure structure14 = new AS400Structure(LO_RC45);
                    AS400Structure structure15 = new AS400Structure(LK_BKS46);
                    AS400Structure structure16 = new AS400Structure(LO_RC46);
                    AS400Structure structure17 = new AS400Structure(LK_BKI63);
                    AS400Structure structure18 = new AS400Structure(LO_RC63);
                    AS400Structure structure19 = new AS400Structure(LK_BAR64);
                    AS400Structure structure20 = new AS400Structure(WS_BAR65);
                    AS400Structure structure21 = new AS400Structure(LK_BAR66);
                    AS400Structure structure22 = new AS400Structure(LO_RC66);
                    AS400Structure structure23 = new AS400Structure(WS_REC75);
                    AS400Structure structure24 = new AS400Structure(LO_RC75);
                    AS400Structure structure25 = new AS400Structure(LK_BMD76);
                    AS400Structure structure26 = new AS400Structure(LO_RC76);
                    AS400Structure structure27 = new AS400Structure(LK_BKF81);
                    AS400Structure structure28 = new AS400Structure(LO_RC81);
                    AS400Structure structure29 = new AS400Structure(LK_BKP84);
                    AS400Structure structure30 = new AS400Structure(LO_RC84);
                    AS400Structure structure31 = new AS400Structure(LK_AGTN);
                    //</editor-fold>

                    ProgramParameter[] parameterList = new ProgramParameter[2];
                    parameterList[0] = new ProgramParameter(RECEIVING_DATA_IN[0].toBytes(filter.TDNR.trim() + "  " + OU_NROID));
                    parameterList[1] = new ProgramParameter(dim);

                    program.setProgram(programName, parameterList);

                    if (program.run() != true) {
                        System.out.println("Program failed!");
                        AS400Message[] messagelist = program.getMessageList();
                        for (int i = 0; i < messagelist.length; ++i) {
                            System.out.println(messagelist[i]);
                        }
                    } else {
                        byte[] receiverVar = parameterList[1].getOutputData();
                        //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                        Object[] N01_RECEIVING_DATA_9879 = (Object[]) structure01.toObject(receiverVar, 0);
                        Object[] N02_RECEIVING_I_9879 = (Object[]) structure02.toObject(RECEIVING_DATA_9879[0].toBytes(N01_RECEIVING_DATA_9879[0]), 0);
                        Object[] N02_RECEIVING_IO_9879 = (Object[]) structure03.toObject(RECEIVING_DATA_9879[1].toBytes(N01_RECEIVING_DATA_9879[1]), 0);
                        Object[] N02_RECEIVING_O_9879 = (Object[]) structure04.toObject(RECEIVING_DATA_9879[2].toBytes(N01_RECEIVING_DATA_9879[2]), 0);

                        Object[] N05_LK_BKT06 = (Object[]) structure05.toObject(RECEIVING_O_9879[0].toBytes(N02_RECEIVING_O_9879[0]), 0);
                        Object[] N05_LK_BKS24 = (Object[]) structure06.toObject(RECEIVING_O_9879[1].toBytes(N02_RECEIVING_O_9879[1]), 0);
                        Object[] N05_LK_BKS30 = (Object[]) ((Object[]) structure07.toObject(RECEIVING_O_9879[2].toBytes(N02_RECEIVING_O_9879[2]), 0))[0];
                        List<Object[]> N07_LO_RC30 = new ArrayList<Object[]>(N05_LK_BKS30.length);
                        for (int i = 0; i < N05_LK_BKS30.length; i++) {
                            N07_LO_RC30.add((Object[]) structure08.toObject(mapping.Char(mapping.GetDimension(LO_RC30)).toBytes(N05_LK_BKS30[i]), 0));
                        }
                        Object[] N05_LK_BKS39 = (Object[]) ((Object[]) structure09.toObject(RECEIVING_O_9879[3].toBytes(N02_RECEIVING_O_9879[3]), 0))[0];
                        List<Object[]> N07_LO_RC39 = new ArrayList<Object[]>(N05_LK_BKS39.length);
                        for (int i = 0; i < N05_LK_BKS39.length; i++) {
                            N07_LO_RC39.add((Object[]) structure10.toObject(mapping.Char(mapping.GetDimension(LO_RC39)).toBytes(N05_LK_BKS39[i]), 0));
                        }
                        Object[] N07_LK_BKS42 = (Object[]) ((Object[]) structure11.toObject(RECEIVING_O_9879[4].toBytes(N02_RECEIVING_O_9879[4]), 0))[0];
                        List<Object[]> N07_LO_RC42 = new ArrayList<Object[]>(N07_LK_BKS42.length);
                        for (int i = 0; i < N07_LK_BKS42.length; i++) {
                            N07_LO_RC42.add((Object[]) structure12.toObject(mapping.Char(mapping.GetDimension(LO_RC42)).toBytes(N07_LK_BKS42[i]), 0));
                        }
                        Object[] N07_LK_BKS45 = (Object[]) ((Object[]) structure13.toObject(RECEIVING_O_9879[5].toBytes(N02_RECEIVING_O_9879[5]), 0))[0];
                        List<Object[]> N07_LO_RC45 = new ArrayList<Object[]>(N07_LK_BKS45.length);
                        for (int i = 0; i < N07_LK_BKS45.length; i++) {
                            N07_LO_RC45.add((Object[]) structure14.toObject(mapping.Char(mapping.GetDimension(LO_RC45)).toBytes(N07_LK_BKS45[i]), 0));
                        }
                        Object[] N07_LK_BKS46 = (Object[]) ((Object[]) structure15.toObject(RECEIVING_O_9879[6].toBytes(N02_RECEIVING_O_9879[6]), 0))[0];
                        List<Object[]> N07_LO_RC46 = new ArrayList<Object[]>(N07_LK_BKS46.length);
                        for (int i = 0; i < N07_LK_BKS46.length; i++) {
                            N07_LO_RC46.add((Object[]) structure16.toObject(mapping.Char(mapping.GetDimension(LO_RC46)).toBytes(N07_LK_BKS46[i]), 0));
                        }
                        Object[] N07_LK_BKI63 = (Object[]) ((Object[]) structure17.toObject(RECEIVING_O_9879[7].toBytes(N02_RECEIVING_O_9879[7]), 0))[0];
                        List<Object[]> N07_LO_RC63 = new ArrayList<Object[]>(N07_LK_BKI63.length);
                        for (int i = 0; i < N07_LK_BKI63.length; i++) {
                            N07_LO_RC63.add((Object[]) structure18.toObject(mapping.Char(mapping.GetDimension(LO_RC63)).toBytes(N07_LK_BKI63[i]), 0));
                        }
                        Object[] N07_LK_BAR64 = (Object[]) structure19.toObject(RECEIVING_O_9879[8].toBytes(N02_RECEIVING_O_9879[8]), 0);
                        Object[] N07_WS_BAR65 = (Object[]) structure20.toObject(RECEIVING_O_9879[9].toBytes(N02_RECEIVING_O_9879[9]), 0);
                        Object[] N07_LK_BAR66 = (Object[]) ((Object[]) structure21.toObject(RECEIVING_O_9879[10].toBytes(N02_RECEIVING_O_9879[10]), 0))[0];
                        List<Object[]> N07_LO_RC66 = new ArrayList<Object[]>(N07_LK_BAR66.length);
                        for (int i = 0; i < N07_LK_BAR66.length; i++) {
                            N07_LO_RC66.add((Object[]) structure22.toObject(mapping.Char(mapping.GetDimension(LO_RC66)).toBytes(N07_LK_BAR66[i]), 0));
                        }
                        Object[] N07_WS_REC75 = (Object[]) ((Object[]) structure23.toObject(RECEIVING_O_9879[11].toBytes(N02_RECEIVING_O_9879[11]), 0))[0];
                        List<Object[]> N07_LO_RC75 = new ArrayList<Object[]>(N07_WS_REC75.length);
                        for (int i = 0; i < N07_WS_REC75.length; i++) {
                            N07_LO_RC75.add((Object[]) structure24.toObject(mapping.Char(mapping.GetDimension(LO_RC75)).toBytes(N07_WS_REC75[i]), 0));
                        }
                        Object[] N07_LK_BMD76 = (Object[]) ((Object[]) structure25.toObject(RECEIVING_O_9879[12].toBytes(N02_RECEIVING_O_9879[12]), 0))[0];
                        List<Object[]> N07_LO_RC76 = new ArrayList<Object[]>(N07_LK_BMD76.length);
                        for (int i = 0; i < N07_LK_BMD76.length; i++) {
                            N07_LO_RC76.add((Object[]) structure26.toObject(mapping.Char(mapping.GetDimension(LO_RC76)).toBytes(N07_LK_BMD76[i]), 0));
                        }
                        Object[] N07_LK_BKF81 = (Object[]) ((Object[]) structure27.toObject(RECEIVING_O_9879[13].toBytes(N02_RECEIVING_O_9879[13]), 0))[0];
                        List<Object[]> N07_LO_RC81 = new ArrayList<Object[]>(N07_LK_BKF81.length);
                        for (int i = 0; i < N07_LK_BKF81.length; i++) {
                            N07_LO_RC81.add((Object[]) structure28.toObject(mapping.Char(mapping.GetDimension(LO_RC81)).toBytes(N07_LK_BKF81[i]), 0));
                        }
                        Object[] N07_LK_BKP84 = (Object[]) ((Object[]) structure29.toObject(RECEIVING_O_9879[14].toBytes(N02_RECEIVING_O_9879[14]), 0))[0];
                        List<Object[]> N07_LO_RC84 = new ArrayList<Object[]>(N07_LK_BKP84.length);
                        for (int i = 0; i < N07_LK_BKP84.length; i++) {
                            N07_LO_RC84.add((Object[]) structure30.toObject(mapping.Char(mapping.GetDimension(LO_RC84)).toBytes(N07_LK_BKP84[i]), 0));
                        }
                        String N07_LK_AGTN = (String) ((Object[]) structure31.toObject(RECEIVING_O_9879[15].toBytes(N02_RECEIVING_O_9879[15]), 0))[0];
                        //</editor-fold>
                        beanFacsimil.strError = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSERR]);
                        if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                            //RECORD 24 - Ticket Document Identification
                            beanFacsimil.DAIS = "20" + Util.fillZeros(6, mapping.getInt(N05_LK_BKS24[IDX_LK_BKS24.R24_DAIS]));
                            beanFacsimil.TODC = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TODC]);
                            beanFacsimil.TOUR = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TOUR]);
                            beanFacsimil.PNRR = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_PNRR]);
                            beanFacsimil.TDNR = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TDNR]);
                            beanFacsimil.CDGT = Util.fillZeros(1, mapping.getInt(N05_LK_BKS24[IDX_LK_BKS24.R24_CDGT]));
                            beanFacsimil.TRNC = mapping.getString(N05_LK_BKS24[IDX_LK_BKS24.R24_TRNC]);
                            beanFacsimil.AGTN = Util.fillZeros(8, mapping.getInt(N05_LK_BKS24[IDX_LK_BKS24.R24_AGTN]));

                            //RECORD 46 - Qualifying Issue Information for Sales Transactions Record
                            for (int i = 0; i < N07_LO_RC46.size(); i++) {
                                lstReg46Restrict.add(mapping.getString(N07_LO_RC46.get(i)[IDX_LO_RC46.R46_ENRS]));
                                lstReg46OrigIssue.add("");
                            }
                            //RECORD 63 - Itinerary Data Segment
                            for (int i = 0; i < 4; i++) {
                                reg63 = new BSPF63();
                                reg63.CDGT = mapping.getInt(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_CDGT]);
                                reg63.STPO = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_STPO]);
                                reg63.ORAC = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_ORAC]);
                                reg63.DSTC = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_DSTC]);
                                reg63.CARR = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_CARR]);
                                reg63.FTNR = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FTNR]);
                                reg63.DAIS = Util.fillZeros(6, mapping.getInt(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_DAIS]));
                                reg63.RBKD = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_RBKD]);
                                reg63.FTDA = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FTDA]);
                                reg63.FTDT = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FTDT]);
                                reg63.FBST = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FBST]);
                                reg63.FBTD = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_FBTD]);
                                reg63.NBDA = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_NBDA]);
                                reg63.NADA = mapping.getString(N07_LO_RC63.get(i)[IDX_LO_RC63.R63_NADA]);
                                try {
                                    if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                        reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                    } else {
                                        reg63.strDescFrom = reg63.ORAC;
                                    }
                                    if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                        reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                    } else {
                                        reg63.strDescTo = reg63.DSTC;
                                    }
                                } catch (Exception e) {
                                }
                                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                //</editor-fold>
                                lstReg63.add(reg63);
                            }
                            //agregado por zpp 20200313
                            if (IDX_LO_RC30.R30_SQNR > 0) {
                                String R30_TMFT1, R30_TMFT2, R30_TMFT3 = "";
                                double R30_TMFA1, R30_TMFA2, R30_TMFA3 = 0;
                                for (int n = 0; n < N07_LO_RC30.size(); n++) {
                                    R30_TMFT1 = "";
                                    R30_TMFT2 = "";
                                    R30_TMFT3 = "";
                                    R30_TMFA1 = 0;
                                    R30_TMFA2 = 0;
                                    R30_TMFA3 = 0;
                                    if (!mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT1]).trim().equals("")) {
                                        R30_TMFT1 = mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT1]).trim();
                                        R30_TMFA1 = mapping.getDouble(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFA1]);
                                        if (R30_TMFA1 != 0) {
                                            lstTaxes.add(R30_TMFT1 + " " + R30_TMFA1);
                                        }
                                    }
                                    if (!mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT2]).trim().equals("")) {
                                        R30_TMFT2 = mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT2]).trim();
                                        R30_TMFA2 = mapping.getDouble(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFA2]);
                                        if (R30_TMFA2 != 0) {
                                            lstTaxes.add(R30_TMFT2 + " " + R30_TMFA2);
                                        }
                                    }
                                    if (!mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT3]).trim().equals("")) {
                                        R30_TMFT3 = mapping.getString(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFT3]).trim();
                                        R30_TMFA3 = mapping.getDouble(N07_LO_RC30.get(n)[IDX_LO_RC30.R30_TMFA3]);
                                        if (R30_TMFA3 != 0) {
                                            lstTaxes.add(R30_TMFT3 + " " + R30_TMFA3);
                                        }
                                    }

                                }
                            }
                            //fin zpp
                            //RECORD 64 - Document Amounts
                            if (mapping.getInt(N07_LK_BAR64[IDX_LK_BAR64.R64_SQNR]) > 0) {
                                String equivalent_s;
                                String regTax;
                                String regTax2;
                                String regTax3;
                                beanFacsimil.FARE = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_FARE]);
                                beanFacsimil.CUTP1 = beanFacsimil.FARE.substring(0, 3);
                                beanFacsimil.FARE = beanFacsimil.FARE.substring(3);
                                equivalent_s = Util.fillZeros(8, mapping.getInt(N07_LK_BAR64[IDX_LK_BAR64.R64_SQNR]));
                                if (mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_EQFR]).trim().length() > 0) {
//                                    beanFacsimil.EQFR = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_EQFR]) + equivalent_s;
                                    beanFacsimil.EQFR = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_EQFR]);
                                } else {
//                                  beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                                    beanFacsimil.EQFR = "";
                                }
                                if (Integer.parseInt(mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA1]).trim()) > 0) {
                                    regTax = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA1]);
                                    lstTaxes.add(regTax);
                                }
                                if (Integer.parseInt(mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA2]).trim()) > 0) {
                                    regTax2 = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA2]);
                                    lstTaxes.add(regTax2);
                                }
                                if (Integer.parseInt(mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA3]).trim()) > 0) {
                                    regTax3 = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TAXA3]);
                                    lstTaxes.add(regTax3);
                                }
                                beanFacsimil.TOTL = mapping.getString(N07_LK_BAR64[IDX_LK_BAR64.R64_TOTL]);
                            }
                            //RECORD 65 - Passenger Information
                            beanFacsimil.PXNM = mapping.getString(N07_WS_BAR65[IDX_WS_BAR65.R65_PXNM]);
                            //RECORD 81 - Fare Calculation
                            for (int i = 0; i < 5; i++) {
                                if (mapping.getString(N07_LO_RC81.get(i)[IDX_LO_RC81.R81_FRCA]).trim().length() > 0) {
                                    lstFC.add(mapping.getString(N07_LO_RC81.get(i)[IDX_LO_RC81.R81_FRCA]));
                                }
                            }
                            //Verificando Cantidad de Conjunciones
                            String strFPTP, strAPLC, strFPAC;
                            Double dblFPAM;
                            for (int i = 0; i < N07_LO_RC84.size(); i++) {
                                strFPTP = mapping.getString(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_FPTP]).trim();
                                strAPLC = mapping.getString(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_APLC]).trim();
                                strFPAC = mapping.getString(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_FPAC]).trim();
                                dblFPAM = mapping.getDouble(N07_LO_RC84.get(i)[IDX_LO_RC84.R84_FPAM]);
                                if (strFPTP.length() > 0) {
                                    if (strFPTP.equals("EX") || strFPTP.equals("ET")) {
                                        beanFacsimil.strIssExc += " / " + strFPAC;
                                    }
                                    if (dblFPAM > 0) {
                                        if (strFPTP.equals("CC") || strFPTP.equals("TC")) {
                                            if (strAPLC.length() > 0) {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM + "  Account:" + strFPAC + "  Approval Code:" + strAPLC);
                                            } else {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM + "  Account:" + strFPAC);
                                            }
                                        } else {
                                            if (strAPLC.length() > 0) {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM + "  Approval Code:" + strAPLC);
                                            } else {
                                                lstFOP.add("Type:" + strFPTP + "  Amount: " + dblFPAM);
                                            }
                                        }
                                    }
                                }
                            }
                            //Verificando Cantidad de Conjunciones
                            beanFacsimil.strIssExc = "";

                            beanFacsimil.strFinCjn = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_FINCNJ]);
                            beanFacsimil.strEsCjn = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_STSCNJ]);
                            strConj = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_CNJPADRE]);
                            long cjn;
                            String cjn_s;
                            for (int i = 0; i < 1; i++) {
                                cjn = Long.parseLong(mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_CNJPADRE])) + (i + 1);
                                cjn_s = cjn + "";
                                strConj = strConj + " - " + cjn_s.substring(9);
                            }
                        } else {
                            beanFacsimil.strMsj = mapping.getString(N02_RECEIVING_IO_9879[IDX_RECEIVING_IO_9879.LK_MSJERR]);
                            //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                            //el uso del cupón consultado (VENTA NO REPORTADA)
                            if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                                try {
                                    for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                                        if (i == Integer.parseInt(filter.CPUI)) {
                                            reg63 = new BSPF63();
                                            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                            //OBTENIENDO DATOS DEL USO =================================
                                            boolean encontroUso = false;
                                            // VOLADO 
                                            strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                    + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND CUPON = '" + i + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);
                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.ORAC = rst2.getString("CDEPART").trim();
                                                reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                reg63.CARR = rst2.getString("CARR").trim();
                                                reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                                reg63.RBKD = rst2.getString("CLAS").trim();
                                                reg63.FBTD = rst2.getString("FBASE").trim();
                                                reg63.strUso = "F";
                                                reg63.strDesUso = "Flown";
                                                reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                                reg63.dblMontoUso = rst2.getDouble("VCPN");
                                            }
                                            try {
                                                rst2.close();
                                            } catch (SQLException e) {
                                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                            }
                                            rst2 = null;

                                            //DISCHARGE
                                            if (!encontroUso) {
                                                strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                        + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                        + "' AND CUPON = '" + i + "' ";

                                                stmt = cnx.prepareStatement(strSQLUSO);
                                                stmt.execute();
                                                rst2 = stmt.getResultSet();
                                                //rst2 = stmt.executeQuery(strSQLUSO);

                                                if (rst2.next()) {
                                                    encontroUso = true;
                                                    reg63.ORAC = rst2.getString("CDEPART").trim();
                                                    reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                    reg63.CARR = rst2.getString("CARR").trim();
                                                    reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                    reg63.DAIS = rst2.getString("FECR").trim();
                                                    reg63.RBKD = rst2.getString("CLAS").trim();
                                                    reg63.FBTD = rst2.getString("FBASE").trim();
                                                    reg63.strUso = "D";
                                                    reg63.strDesUso = "Discharges";
                                                    reg63.strFecUso = rst2.getString("FECR").trim();
                                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                                }
                                                try {
                                                    rst2.close();
                                                } catch (SQLException e) {
                                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                                }
                                                rst2 = null;
                                            }

                                            //EMD
                                            if (!encontroUso) {
                                                strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                        + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                        + "' AND CUPON = '" + i + "' ";

                                                stmt = cnx.prepareStatement(strSQLUSO);
                                                stmt.execute();
                                                rst2 = stmt.getResultSet();
                                                //rst2 = stmt.executeQuery(strSQLUSO);
                                                if (rst2.next()) {
                                                    encontroUso = true;
                                                    reg63.ORAC = rst2.getString("CDEPART").trim();
                                                    reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                    reg63.CARR = rst2.getString("CARR").trim();
                                                    reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                    reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                                    reg63.RBKD = rst2.getString("CLAS").trim();
                                                    reg63.FBTD = rst2.getString("FBASE").trim();
                                                    reg63.strUso = "F";
                                                    reg63.strDesUso = "Flown";
                                                    reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                                }
                                                try {
                                                    rst2.close();
                                                } catch (SQLException e) {
                                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                                }
                                                rst2 = null;
                                            }

                                            //BILLED
                                            if (!encontroUso) {
                                                strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                        + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                        + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                        + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                        + "' AND A020CUPON = '" + (i + 1) + "' ";

                                                stmt = cnx.prepareStatement(strSQLUSO);
                                                stmt.execute();
                                                rst2 = stmt.getResultSet();
                                                //rst2 = stmt.executeQuery(strSQLUSO);
                                                if (rst2.next()) {
                                                    encontroUso = true;
                                                    reg63.strUso = "B";
                                                    reg63.strDesUso = "Billed";
                                                    reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                                    reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                                }
                                                try {
                                                    rst2.close();
                                                } catch (SQLException e) {
                                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                                }
                                                rst2 = null;
                                            }
                                            //</editor-fold>
                                            try {
                                                if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                                    reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                                } else {
                                                    reg63.strDescFrom = reg63.ORAC;
                                                }
                                                if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                                    reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                                } else {
                                                    reg63.strDescTo = reg63.DSTC;
                                                }
                                            } catch (Exception e) {
                                            }
                                            lstReg63.add(reg63);
                                        } else {
                                            reg63 = new BSPF63();
                                            lstReg63.add(reg63);
                                        }
                                    }
                                    if (stmt != null) {
                                        stmt.close();
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                } finally {
                    session.getCNXIBMDB2().closeSystem();
                }
            } else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanFacsimil.strError = rst.getString("BSP").substring(45, 46);
                    if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                        //RECORD 24 - Ticket Document Identification
                        beanFacsimil.DAIS = "20" + rst.getString("BSP").substring(281, 287);
                        beanFacsimil.TODC = rst.getString("BSP").substring(364, 370);
                        beanFacsimil.TOUR = rst.getString("BSP").substring(345, 360);
                        beanFacsimil.PNRR = rst.getString("BSP").substring(382, 395);
                        beanFacsimil.TDNR = rst.getString("BSP").substring(293, 306);
                        beanFacsimil.CDGT = rst.getString("BSP").substring(308, 309);
                        beanFacsimil.TRNC = rst.getString("BSP").substring(360, 364);
                        beanFacsimil.AGTN = rst.getString("BSP").substring(13886, 13894);
                        //RECORD 46 - Qualifying Issue Information for Sales Transactions Record
                        int x46 = 136;
                        for (int i = 0; i < 3; i++) {
                            if (rst.getString("BSP").substring(3444 + (i * x46), 3447 + (i * x46)).trim().length() > 0) {
                                String reg46Restrict = rst.getString("BSP").substring(3517 + (i * x46), 3575 + (i * x46));
                                String reg46OrigIssue = rst.getString("BSP").substring(3485 + (i * x46), 3517 + (i * x46));
                                lstReg46Restrict.add(reg46Restrict);
                                lstReg46OrigIssue.add(reg46OrigIssue);
                            }
                        }
                        //RECORD 63 - Itinerary Data Segment
                        //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                        int x63 = 136;
                        for (int i = 0; i < 4; i++) {
                            if ((rst.getString("BSP").substring(3852 + (i * x63), 3855 + (i * x63)).trim().length() > 0) || (rst.getString("BSP").substring(3912 + (i * x63), 3915 + (i * x63)).trim().length() > 0)) {
                                reg63 = new BSPF63();
                                reg63.CDGT = (i + 1);
                                reg63.STPO = rst.getString("BSP").substring(3894 + (i * x63), 3895 + (i * x63));
                                reg63.ORAC = rst.getString("BSP").substring(3912 + (i * x63), 3915 + (i * x63));
                                reg63.DSTC = rst.getString("BSP").substring(3917 + (i * x63), 3920 + (i * x63));
                                reg63.CARR = rst.getString("BSP").substring(3922 + (i * x63), 3926 + (i * x63));
                                reg63.FTNR = rst.getString("BSP").substring(3927 + (i * x63), 3932 + (i * x63));
                                reg63.DAIS = rst.getString("BSP").substring(3865 + (i * x63), 3871 + (i * x63));
                                reg63.RBKD = rst.getString("BSP").substring(3932 + (i * x63), 3934 + (i * x63));
                                reg63.FTDA = rst.getString("BSP").substring(3934 + (i * x63), 3939 + (i * x63));
                                reg63.FTDT = rst.getString("BSP").substring(3940 + (i * x63), 3945 + (i * x63));
                                reg63.FBST = rst.getString("BSP").substring(3948 + (i * x63), 3950 + (i * x63));
                                reg63.FBTD = rst.getString("BSP").substring(3954 + (i * x63), 3969 + (i * x63));
                                reg63.NBDA = rst.getString("BSP").substring(3895 + (i * x63), 3900 + (i * x63));
                                reg63.NADA = rst.getString("BSP").substring(3900 + (i * x63), 3905 + (i * x63));
                                try {
                                    if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                        reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                    } else {
                                        reg63.strDescFrom = reg63.ORAC;
                                    }
                                    if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                        reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                    } else {
                                        reg63.strDescTo = reg63.DSTC;
                                    }
                                } catch (Exception e) {
                                }

                                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                //OBTENIENDO DATOS DEL USO =================================
                                boolean encontroUso = false;
                                // VOLADO 
                                strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "F";
                                    reg63.strDesUso = "Flown";
                                    reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;

                                //DISCHARGE
                                if (!encontroUso) {
                                    strSQLUSO = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + (i + 1) + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "D";
                                        reg63.strDesUso = "Discharges";
                                        reg63.strFecUso = rst2.getString("FECR").trim();
                                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }

                                //EMD
                                if (!encontroUso) {
                                    strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + (i + 1) + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "F";
                                        reg63.strDesUso = "Flown";
                                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }

                                //BILLED
                                if (!encontroUso) {
                                    strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                            + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND A020CUPON = '" + (i + 1) + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);
                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.strUso = "B";
                                        reg63.strDesUso = "Billed";
                                        reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                        reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;
                                }

                                strSQLLEG = "SELECT FORMA FROM PRAXIS.A1897 "
                                        + " WHERE CCUST = '" + ccust.trim()
                                        + "' AND CIA   = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt2 = cnx.prepareStatement(strSQLLEG);
                                stmt2.execute();
                                rst3 = stmt2.getResultSet();
                                reg63.strLeg = "N";
                                if (rst3.next()) {
                                    reg63.strLeg = "Y";
                                }
                                try {
                                    rst3.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst3 = null;

                                //</editor-fold>
                                lstReg63.add(reg63);
                            }
                        }
                        if (stmt != null) {
                            stmt.close();
                        }
                        //RECORD 64 - Document Amounts
                        if (rst.getString("BSP").substring(4396, 4399).trim().length() > 0) {
                            String equivalent_s;
                            String regTax;
                            String regTax2;
                            String regTax3;
                            beanFacsimil.CUTP1 = rst.getString("BSP").substring(4437, 4440);
                            beanFacsimil.FARE = rst.getString("BSP").substring(4440, 4448);
                            equivalent_s = rst.getString("BSP").substring(4452, 4460);
                            if (rst.getString("BSP").substring(4449, 4452).trim().length() > 0) {
                                //  beanFacsimil.EQFR = rst.getString("BSP").substring(4449, 4452) + equivalent_s;
                                beanFacsimil.EQFR = rst.getString("BSP").substring(4449, 4452);
                            } else {
                                //  beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                                beanFacsimil.EQFR = "";
                            }
                            regTax = rst.getString("BSP").substring(4460, 4471);
                            lstTaxes.add(regTax);
                            if (rst.getString("BSP").substring(4471, 4482).trim().length() > 0) {
                                regTax2 = rst.getString("BSP").substring(4471, 4482);
                                lstTaxes.add(regTax2);
                            }
                            if (rst.getString("BSP").substring(4482, 4493).trim().length() > 0) {
                                regTax3 = rst.getString("BSP").substring(4482, 4493);
                                lstTaxes.add(regTax3);
                            }
                            beanFacsimil.TOTL = rst.getString("BSP").substring(4493, 4504);
                        }
                        //RECORD 65 - Passenger Information
                        beanFacsimil.PXNM = rst.getString("BSP").substring(4573, 4622);
                        //RECORD 81 - Fare Calculation
                        int x81 = 136;
                        for (int i = 0; i < 4; i++) {
                            if (rst.getString("BSP").substring(11674 + (i * x81), 11677 + (i * x81)).trim().length() > 0) {
                                String FC = rst.getString("BSP").substring(11718 + (i * x81), 11805 + (i * x81));
                                lstFC.add(FC);
                            }
                        }
                        //Verificando Cantidad de Conjunciones
                        if (Integer.parseInt(rst.getString("BSP").substring(13894, 13895)) == 0) {
                            //RECORD 84 - Form of Payment
                            int x84 = 142;
                            for (int i = 0; i < 6; i++) {
                                if (rst.getString("BSP").substring(13034 + (i * x84), 13037 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst.getString("BSP").substring(13059, 13061).trim();
                                    String strFPTP = rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84));
                                    }
                                    if (Long.parseLong(rst.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) + "." + rst.getString("BSP").substring(13080 + (i * x84), 13082 + (i * x84));
                                        if (rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("CC") || rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("TC")) {
                                            if (rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim() + "  Approval Code:" + rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            //cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                            cs2 = cnx.prepareCall(strSQL);
                            cs2.registerOutParameter(2, Types.CHAR);
                            cs2.registerOutParameter(3, Types.CHAR);
                            long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("BSP").substring(13894, 13895));
                            String newTDNR_s = newTDNR + "  " + rst.getString("BSP").substring(15, 31) + filter.TDNR.substring(0, 13).trim();
                            cs2.setString(1, newTDNR_s);
                            cs2.execute();

                            rst2 = cs2.getResultSet();
                            while (rst2.next()) {
                                //RECORD 84 - Form of Payment
                                int x84 = 142;
                                for (int i = 0; i < 6; i++) {
                                    if (rst2.getString("BSP").substring(13034 + (i * x84), 13037 + (i * x84)).trim().length() > 0) {
                                        // String strFPTP = rst2.getString("BSP").substring(13059, 13061).trim();
                                        String strFPTP = rst.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim();
                                        if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                            beanFacsimil.strIssExc += " / " + rst2.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84));
                                        }
                                        if (Long.parseLong(rst2.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) > 0) {
                                            String monto = Long.parseLong(rst2.getString("BSP").substring(13069 + (i * x84), 13080 + (i * x84))) + "." + rst2.getString("BSP").substring(13080 + (i * x84), 13082 + (i * x84));
                                            if (rst2.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("CC") || rst2.getString("BSP").substring(13059 + (i * x84), 13061 + (i * x84)).trim().equals("TC")) {
                                                if (rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim() + "  Approval Code:" + rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("BSP").substring(13082 + (i * x84), 13101 + (i * x84)).trim());
                                                }
                                            } else {
                                                if (rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst2.getString("BSP").substring(13110 + (i * x84), 13116 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst2.getString("BSP").substring(13059 + (i * x84), 13069 + (i * x84)).trim() + "  Amount: " + monto);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            try {
                                cs2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                        }
                        beanFacsimil.strFinCjn = rst.getString("BSP").substring(44, 45);
                        beanFacsimil.strEsCjn = rst.getString("BSP").substring(30, 31);
                        strConj = rst.getString("BSP").substring(31, 44);
                        for (int i = 0; i < Integer.parseInt(rst.getString("BSP").substring(13894, 13895)); i++) {
                            long cjn = Long.parseLong(rst.getString("BSP").substring(31, 44)) + (i + 1);
                            String cjn_s = cjn + "";
                            strConj = strConj + " - " + cjn_s.substring(9);
                        }
                    } else {
                        beanFacsimil.strMsj = rst.getString("BSP").substring(52, 132);
                        //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                        //el uso del cupón consultado (VENTA NO REPORTADA)
                        if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                            try {
                                //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                                for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                                    if (i == Integer.parseInt(filter.CPUI)) {
                                        reg63 = new BSPF63();

                                        // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                        //OBTENIENDO DATOS DEL USO =================================
                                        boolean encontroUso = false;
                                        // VOLADO 
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);
                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
                                            reg63.strUso = "F";
                                            reg63.strDesUso = "Flown";
                                            reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;

                                        //DISCHARGE
                                        if (!encontroUso) {
                                            strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                    + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND CUPON = '" + i + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);

                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.ORAC = rst2.getString("CDEPART").trim();
                                                reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                reg63.CARR = rst2.getString("CARR").trim();
                                                reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                reg63.DAIS = rst2.getString("FECR").trim();
                                                reg63.RBKD = rst2.getString("CLAS").trim();
                                                reg63.FBTD = rst2.getString("FBASE").trim();
                                                reg63.strUso = "D";
                                                reg63.strDesUso = "Discharges";
                                                reg63.strFecUso = rst2.getString("FECR").trim();
                                                reg63.dblMontoUso = rst2.getDouble("VCPN");
                                            }
                                            try {
                                                rst2.close();
                                            } catch (SQLException e) {
                                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                            }
                                            rst2 = null;
                                        }

                                        //EMD
                                        if (!encontroUso) {
                                            strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                    + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND CUPON = '" + i + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);
                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.ORAC = rst2.getString("CDEPART").trim();
                                                reg63.DSTC = rst2.getString("CARRIVA").trim();
                                                reg63.CARR = rst2.getString("CARR").trim();
                                                reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                                reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                                reg63.RBKD = rst2.getString("CLAS").trim();
                                                reg63.FBTD = rst2.getString("FBASE").trim();
                                                reg63.strUso = "F";
                                                reg63.strDesUso = "Flown";
                                                reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                                reg63.dblMontoUso = rst2.getDouble("VCPN");
                                            }
                                            try {
                                                rst2.close();
                                            } catch (SQLException e) {
                                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                            }
                                            rst2 = null;
                                        }

                                        //BILLED
                                        if (!encontroUso) {
                                            strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                    + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                    + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                    + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                    + "' AND A020CUPON = '" + (i + 1) + "' ";

                                            stmt = cnx.prepareStatement(strSQLUSO);
                                            stmt.execute();
                                            rst2 = stmt.getResultSet();
                                            //rst2 = stmt.executeQuery(strSQLUSO);
                                            if (rst2.next()) {
                                                encontroUso = true;
                                                reg63.strUso = "B";
                                                reg63.strDesUso = "Billed";
                                                reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                                reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                            }
                                            try {
                                                rst2.close();
                                            } catch (SQLException e) {
                                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                            }
                                            rst2 = null;
                                        }

                                        //</editor-fold>
                                        try {
                                            if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                                reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                            } else {
                                                reg63.strDescFrom = reg63.ORAC;
                                            }
                                            if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                                reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                            } else {
                                                reg63.strDescTo = reg63.DSTC;
                                            }
                                        } catch (Exception e) {
                                        }
                                        lstReg63.add(reg63);
                                    } else {
                                        reg63 = new BSPF63();
                                        lstReg63.add(reg63);
                                    }
                                }
                                if (stmt != null) {
                                    stmt.close();
                                }
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            beanFacsimil.lstReg46Restrict = lstReg46Restrict;
            beanFacsimil.lstReg46OrigIssue = lstReg46OrigIssue;
            beanFacsimil.lstReg63 = lstReg63;
            beanFacsimil.lstFC = lstFC;
            beanFacsimil.lstFOP = lstFOP;
            beanFacsimil.lstTaxes = lstTaxes;
            beanFacsimil.strConjuncion = strConj;
            if (stmt != null) {
                stmt.close();
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

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
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rst3 != null) {
                try {
                    rst3.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs2 != null) {
                try {
                    cs2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

    public FACSIMILFilter loadARCFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null;
        PreparedStatement stmt = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<BSPF63>();
        List<String> lstTaxes = new ArrayList<String>();
        List<String> lstReg46Restrict = new ArrayList<String>();
        List<String> lstReg46OrigIssue = new ArrayList<String>();
        List<String> lstFC = new ArrayList<String>();
        List<String> lstFOP = new ArrayList<String>();
        BSPF63 reg63;
        String strConj = "", strCompanion = "";
        String strSQLUSO = "";

        Connection cnx = null;
        try {
            String strSQL = "{CALL " + session.getMainLibrary() + ".PXARCFACSIMILNEW(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.TDNR.trim());
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "ARC";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            rst = cs.getResultSet();
            while (rst.next()) {
                beanFacsimil.strError = rst.getString("ARC").substring(45, 46);
                if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                    //RECORD 24 - Ticket Document Identification
                    beanFacsimil.DAIS = "20" + rst.getString("ARC").substring(281, 287);
                    beanFacsimil.TODC = rst.getString("ARC").substring(377, 383);
                    beanFacsimil.TOUR = rst.getString("ARC").substring(346, 360);
                    beanFacsimil.PNRR = rst.getString("ARC").substring(390, 403);
                    beanFacsimil.TDNR = rst.getString("ARC").substring(293, 306);
                    beanFacsimil.CDGT = rst.getString("ARC").substring(308, 309);
                    beanFacsimil.TRNC = rst.getString("ARC").substring(361, 363);
                    beanFacsimil.AGTN = rst.getString("ARC").substring(9514, 9522);
                    //RECORD 30 - Fare/Tax Amounts
                    int x30 = 146;
                    for (int i = 0; i < 10; i++) {
                        if (rst.getString("ARC").substring(406 + (i * x30), 409 + (i * x30)).trim().length() > 0) {
                            //beanFacsimil.CUTP1 = rst.getString("ARC").substring(460, 463);
                            if (Long.parseLong(rst.getString("ARC").substring(528, 539)) != 0 && rst.getString("ARC").substring(528, 539).length() != 0) {//INFR
                                beanFacsimil.CUTP1 = rst.getString("ARC").substring(544, 547);
                                beanFacsimil.FARE = rst.getString("ARC").substring(528, 539) + "." + rst.getString("ARC").substring(539, 541);
                                beanFacsimil.EQFR = rst.getString("ARC").substring(460, 463) + rst.getString("ARC").substring(447, 458) + "." + rst.getString("ARC").substring(458, 460);
                            } else {
                                beanFacsimil.CUTP1 = rst.getString("ARC").substring(460, 463);
                                beanFacsimil.FARE = rst.getString("ARC").substring(447, 458) + "." + rst.getString("ARC").substring(458, 460);
                                beanFacsimil.EQFR = rst.getString("ARC").substring(544, 547) + rst.getString("ARC").substring(528, 539) + "." + rst.getString("ARC").substring(539, 541);
                            }
                            //beanFacsimil.FARE = rst.getString("ARC").substring(447, 458) + "." + rst.getString("ARC").substring(458, 460);
                            //beanFacsimil.EQFR = rst.getString("ARC").substring(544, 547) + rst.getString("ARC").substring(527, 538) + "." + rst.getString("ARC").substring(538, 540);
                            beanFacsimil.TOTL = rst.getString("ARC").substring(514, 525) + "." + rst.getString("ARC").substring(525, 527);
                            String regTax = rst.getString("ARC").substring(472 + (i * x30), 474 + (i * x30)) + " " + rst.getString("ARC").substring(474 + (i * x30), 480 + (i * x30)) + " " + Long.parseLong(rst.getString("ARC").substring(480 + (i * x30), 491 + (i * x30))) + "." + rst.getString("ARC").substring(491 + (i * x30), 493 + (i * x30));
                            lstTaxes.add(regTax);
                            if ((rst.getString("ARC").substring(493 + (i * x30), 495 + (i * x30))).trim().length() > 0) {
                                String regTax2 = rst.getString("ARC").substring(493 + (i * x30), 495 + (i * x30)) + " " + rst.getString("ARC").substring(495 + (i * x30), 501 + (i * x30)) + " " + Long.parseLong(rst.getString("ARC").substring(501 + (i * x30), 512 + (i * x30))) + "." + rst.getString("ARC").substring(512 + (i * x30), 514 + (i * x30));
                                lstTaxes.add(regTax2);
                            }
                        }
                    }
                    //RECORD 46 - Endorsements/Restrictions Information
                    int x46 = 136;
                    for (int i = 0; i < 3; i++) {
                        if (rst.getString("ARC").substring(4022 + (i * x46), 4025 + (i * x46)).trim().length() > 0) {
                            String reg46Restrict = rst.getString("ARC").substring(4063 + (i * x46), 4112 + (i * x46));
                            String reg46OrigIssue = rst.getString("ARC").substring(4112 + (i * x46), 4144 + (i * x46));
                            lstReg46Restrict.add(reg46Restrict);
                            lstReg46OrigIssue.add(reg46OrigIssue);
                        }
                    }
                    //RECORD 48 - Passenger Information
                    beanFacsimil.PXNM = rst.getString("ARC").substring(4474, 4523);
                    //RECORD 63 - Itinerary Data Segment
                    //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                    int x63 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ARC").substring(4566 + (i * x63), 4569 + (i * x63)).trim().length() > 0 || rst.getString("ARC").substring(4626 + (i * x63), 4629 + (i * x63)).trim().length() > 0) {
                            reg63 = new BSPF63();
                            reg63.CDGT = (i + 1);
                            reg63.STPO = rst.getString("ARC").substring(4608 + (i * x63), 4609 + (i * x63));
                            reg63.ORAC = rst.getString("ARC").substring(4626 + (i * x63), 4629 + (i * x63));
                            reg63.DSTC = rst.getString("ARC").substring(4631 + (i * x63), 4634 + (i * x63));
                            reg63.CARR = rst.getString("ARC").substring(4636 + (i * x63), 4638 + (i * x63));
                            reg63.FTNR = rst.getString("ARC").substring(4641 + (i * x63), 4646 + (i * x63));
                            reg63.DAIS = rst.getString("ARC").substring(4579 + (i * x63), 4585 + (i * x63));
                            reg63.RBKD = rst.getString("ARC").substring(4646 + (i * x63), 4648 + (i * x63));
                            reg63.FTDA = rst.getString("ARC").substring(4648 + (i * x63), 4654 + (i * x63));
                            reg63.FTDT = rst.getString("ARC").substring(4654 + (i * x63), 4659 + (i * x63));
                            reg63.FBST = rst.getString("ARC").substring(4662 + (i * x63), 4664 + (i * x63));
                            reg63.FBTD = rst.getString("ARC").substring(4668 + (i * x63), 4683 + (i * x63));
                            reg63.NBDA = rst.getString("ARC").substring(4609 + (i * x63), 4614 + (i * x63));
                            reg63.NADA = rst.getString("ARC").substring(4614 + (i * x63), 4619 + (i * x63));
                            try {
                                if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                    reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                } else {
                                    reg63.strDescFrom = reg63.ORAC;
                                }
                                if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                    reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                } else {
                                    reg63.strDescTo = reg63.DSTC;
                                }
                            } catch (Exception e) {
                            }

                            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                            //OBTENIENDO DATOS DEL USO =================================
                            boolean encontroUso = false;
                            // VOLADO 
                            strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND CUPON = '" + (i + 1) + "' ";

                            stmt = cnx.prepareStatement(strSQLUSO);
                            stmt.execute();
                            rst2 = stmt.getResultSet();
                            //rst2 = stmt.executeQuery(strSQLUSO);
                            if (rst2.next()) {
                                encontroUso = true;
                                reg63.strUso = "F";
                                reg63.strDesUso = "Flown";
                                reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                reg63.dblMontoUso = rst2.getDouble("VCPN");
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;

                            //DISCHARGE
                            if (!encontroUso) {
                                strSQLUSO = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);

                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "D";
                                    reg63.strDesUso = "Discharges";
                                    reg63.strFecUso = rst2.getString("FECR").trim();
                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //EMD
                            if (!encontroUso) {
                                strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "F";
                                    reg63.strDesUso = "Flown";
                                    reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //BILLED
                            if (!encontroUso) {
                                strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                        + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A020CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "B";
                                    reg63.strDesUso = "Billed";
                                    reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                    reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //</editor-fold>
                            lstReg63.add(reg63);
                        }
                    }
                    if (stmt != null) {
                        stmt.close();
                    }
                    //RECORD 81 - Fare Calculation
                    int x81 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ARC").substring(8198 + (i * x81), 8285 + (i * x81)).trim().length() > 0) {
                            String FC = rst.getString("ARC").substring(8198 + (i * x81), 8285 + (i * x81));
                            lstFC.add(FC);
                        }
                    }
                    beanFacsimil.strEsCjn = rst.getString("ARC").substring(30, 31);
                    //Verificando Cantidad de Conjunciones
                    if (Integer.parseInt(rst.getString("ARC").substring(9652, 9653)) == 0) {
                        if (beanFacsimil.strEsCjn.equals("C") && rst.getString("ARC").substring(9522, 9652).length() > 0) {
                            if (rst.getString("ARC").substring(9522, 9535).trim().equals(filter.TDNR.trim().substring(0, 13))) {
                                //RECORD 84 - Form of Payment
                                int x84 = 136;
                                for (int i = 0; i < 6; i++) {
                                    if (rst.getString("ARC").substring(8698 + (i * x84), 8701 + (i * x84)).trim().length() > 0) {
                                        // String strFPTP = rst.getString("ARC").substring(8723, 8725).trim();
                                        String strFPTP = rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim();
                                        if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                            beanFacsimil.strIssExc += " / " + rst.getString("ARC").substring(8746 + (i * x84), 8765 + (i * x84));
                                        }
                                        if (Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) > 0) {
                                            String monto = Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) + "." + rst.getString("ARC").substring(8742 + (i * x84), 8744 + (i * x84));
                                            if (rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("CC") || rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("TC")) {
                                                if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim());
                                                }
                                            } else {
                                                if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                                } else {
                                                    lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            //RECORD 84 - Form of Payment
                            int x84 = 136;
                            for (int i = 0; i < 6; i++) {
                                if (rst.getString("ARC").substring(8698 + (i * x84), 8701 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst.getString("ARC").substring(8723, 8725).trim();
                                    String strFPTP = rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst.getString("ARC").substring(8746 + (i * x84), 8765 + (i * x84));
                                    }
                                    if (Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) + "." + rst.getString("ARC").substring(8742 + (i * x84), 8744 + (i * x84));
                                        if (rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("CC") || rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("TC")) {
                                            if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                        cs2 = cnx.prepareCall(strSQL);
                        long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("ARC").substring(9652, 9653));
                        String newTDNR_s = newTDNR + "  " + rst.getString("ARC").substring(15, 31) + filter.TDNR.substring(0, 13).trim();
                        cs2.setString(1, newTDNR_s);
                        cs2.execute();

                        rst2 = cs2.getResultSet();
                        while (rst2.next()) {
                            //RECORD 84 - Form of Payment
                            int x84 = 136;
                            for (int i = 0; i < 6; i++) {
                                if (rst2.getString("ARC").substring(8698 + (i * x84), 8701 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst2.getString("ARC").substring(8723, 8725).trim();
                                    String strFPTP = rst.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst2.getString("ARC").substring(8746 + (i * x84), 8765 + (i * x84));
                                    }
                                    if (Long.parseLong(rst2.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst2.getString("ARC").substring(8733 + (i * x84), 8742 + (i * x84))) + "." + rst2.getString("ARC").substring(8742 + (i * x84), 8744 + (i * x84));
                                        if (rst2.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("CC") || rst2.getString("ARC").substring(8723 + (i * x84), 8725 + (i * x84)).trim().equals("TC")) {
                                            if (rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim() + "  Approval Code:" + rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ARC").substring(8744 + (i * x84), 8763 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst2.getString("ARC").substring(8772 + (i * x84), 8778 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst2.getString("ARC").substring(8723 + (i * x84), 8731 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        try {
                            cs2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                    }
                    beanFacsimil.strFinCjn = rst.getString("ARC").substring(44, 45);
                    if (beanFacsimil.strEsCjn.equals("C")) {
                        strConj = rst.getString("ARC").substring(9522, 9535);
                        int xCT = 13;
                        int cant = rst.getString("ARC").substring(9522, 9652).trim().length() / 13;
                        strCompanion = rst.getString("ARC").substring(9522, 9652).trim();
                        for (int i = 1; i < cant; i++) {
                            strConj = strConj + " - " + rst.getString("ARC").substring(9522 + (i * xCT), 9535 + (i * xCT));
                        }
                    } else {
                        strConj = rst.getString("ARC").substring(31, 44);
                        for (int i = 0; i < Integer.parseInt(rst.getString("ARC").substring(9652, 9653)); i++) {
                            long cjn = Long.parseLong(rst.getString("ARC").substring(31, 44)) + (i + 1);
                            String cjn_s = cjn + "";
                            strConj = strConj + " - " + cjn_s.substring(9);
                        }
                    }
                } else {
                    beanFacsimil.strMsj = rst.getString("ARC").substring(52, 132);
                    //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                    //el uso del cupón consultado (VENTA NO REPORTADA)
                    if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                        try {
                            //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                            for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                                if (i == Integer.parseInt(filter.CPUI)) {
                                    reg63 = new BSPF63();

                                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                    //OBTENIENDO DATOS DEL USO =================================
                                    boolean encontroUso = false;
                                    // VOLADO 
                                    strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                            + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + i + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);

                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.ORAC = rst2.getString("CDEPART").trim();
                                        reg63.DSTC = rst2.getString("CARRIVA").trim();
                                        reg63.CARR = rst2.getString("CARR").trim();
                                        reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                        reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                        reg63.RBKD = rst2.getString("CLAS").trim();
                                        reg63.FBTD = rst2.getString("FBASE").trim();
                                        reg63.strUso = "F";
                                        reg63.strDesUso = "Flown";
                                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;

                                    //DISCHARGE
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("FECR").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
                                            reg63.strUso = "D";
                                            reg63.strDesUso = "Discharges";
                                            reg63.strFecUso = rst2.getString("FECR").trim();
                                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //EMD
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
                                            reg63.strUso = "F";
                                            reg63.strDesUso = "Flown";
                                            reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //BILLED
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND A020CUPON = '" + (i + 1) + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);
                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.strUso = "B";
                                            reg63.strDesUso = "Billed";
                                            reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                            reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //</editor-fold>
                                    try {
                                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                        } else {
                                            reg63.strDescFrom = reg63.ORAC;
                                        }
                                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                        } else {
                                            reg63.strDescTo = reg63.DSTC;
                                        }
                                    } catch (Exception e) {
                                    }
                                    lstReg63.add(reg63);
                                } else {
                                    reg63 = new BSPF63();
                                    lstReg63.add(reg63);
                                }
                            }
                            if (stmt != null) {
                                stmt.close();
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            beanFacsimil.lstReg46Restrict = lstReg46Restrict;
            beanFacsimil.lstReg46OrigIssue = lstReg46OrigIssue;
            beanFacsimil.lstReg63 = lstReg63;
            beanFacsimil.lstFC = lstFC;
            beanFacsimil.lstFOP = lstFOP;
            beanFacsimil.lstTaxes = lstTaxes;
            beanFacsimil.strConjuncion = strConj;
            beanFacsimil.strCompanion = strCompanion;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (stmt != null) {
                stmt.close();
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

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
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs2 != null) {
                try {
                    cs2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

    public FACSIMILFilter loadASRFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {

        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null;
        PreparedStatement stmt = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<BSPF63>();
        List<String> lstTaxes = new ArrayList<String>();
        List<String> lstReg46Restrict = new ArrayList<String>();
        List<String> lstReg46OrigIssue = new ArrayList<String>();
        List<String> lstFC = new ArrayList<String>();
        List<String> lstFOP = new ArrayList<String>();
        BSPF63 reg63;
        String strConj = "";
        String strSQLUSO = "";

        Connection cnx = null;
        try {
            String strSQL = "{CALL " + session.getMainLibrary() + ".PXASRFACSIMILNEW(?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, filter.TDNR.trim());
            cs.execute();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "ASR";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            rst = cs.getResultSet();
            while (rst.next()) {
                beanFacsimil.strError = rst.getString("ASR").substring(45, 46);
                if (beanFacsimil.strError.equals("0") || beanFacsimil.strError.trim().equals("")) {
                    //RECORD 24 - Ticket Document Identification
                    beanFacsimil.DAIS = "20" + rst.getString("ASR").substring(281, 287);
                    beanFacsimil.TODC = rst.getString("ASR").substring(364, 378);
                    beanFacsimil.TOUR = rst.getString("ASR").substring(345, 360);
                    beanFacsimil.PNRR = rst.getString("ASR").substring(382, 395);
                    beanFacsimil.TDNR = rst.getString("ASR").substring(293, 306);
                    beanFacsimil.CDGT = rst.getString("ASR").substring(308, 309);
                    beanFacsimil.TRNC = rst.getString("ASR").substring(360, 364);
                    beanFacsimil.AGTN = rst.getString("ASR").substring(15304, 15312);
                    //RECORD 46 - Endorsements/Restrictions Information
                    int x46 = 136;
                    for (int i = 0; i < 3; i++) {
                        if (rst.getString("ASR").substring(9996 + (i * x46), 9999 + (i * x46)).trim().length() > 0) {
                            String reg46Restrict = rst.getString("ASR").substring(10037 + (i * x46), 10097 + (i * x46));
                            String reg46OrigIssue = "";
                            lstReg46Restrict.add(reg46Restrict);
                            lstReg46OrigIssue.add(reg46OrigIssue);
                        }
                    }
                    //RECORD 63 - Itinerary Data Segment
                    //session.getCNXIBMDB2().getConnection().createStatement();

                    int x63 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ASR").substring(10858 + (i * x63), 10861 + (i * x63)).trim().length() > 0 || rst.getString("ASR").substring(10918 + (i * x63), 10923 + (i * x63)).length() > 0) {
                            //if (rst.getString("ASR").substring(7308 + (i * x63), 7311 + (i * x63)).trim().length() > 0 || rst.getString("ASR").substring(7368 + (i * x63), 7373 + (i * x63)).length() > 0) {
                            reg63 = new BSPF63();
                            reg63.CDGT = (i + 1);
                            reg63.STPO = rst.getString("ASR").substring(10900 + (i * x63), 10901 + (i * x63));
                            reg63.ORAC = rst.getString("ASR").substring(10918 + (i * x63), 10923 + (i * x63));
                            reg63.DSTC = rst.getString("ASR").substring(10923 + (i * x63), 10928 + (i * x63));
                            reg63.CARR = rst.getString("ASR").substring(10928 + (i * x63), 10932 + (i * x63));
                            reg63.FTNR = rst.getString("ASR").substring(10933 + (i * x63), 10938 + (i * x63));
                            reg63.DAIS = rst.getString("ASR").substring(10871 + (i * x63), 10877 + (i * x63));
                            reg63.RBKD = rst.getString("ASR").substring(10938 + (i * x63), 10940 + (i * x63));
                            reg63.FTDA = rst.getString("ASR").substring(10940 + (i * x63), 10945 + (i * x63));
                            reg63.FTDT = rst.getString("ASR").substring(10946 + (i * x63), 10951 + (i * x63));
                            reg63.FBST = "";
                            reg63.FBTD = rst.getString("ASR").substring(10958 + (i * x63), 10973 + (i * x63));
                            reg63.NBDA = "";
                            reg63.NADA = "";
                            /*reg63.STPO = rst.getString("ASR").substring(7350 + (i * x63), 7351 + (i * x63));
                             reg63.ORAC = rst.getString("ASR").substring(7368 + (i * x63), 7373 + (i * x63));
                             reg63.DSTC = rst.getString("ASR").substring(7373 + (i * x63), 7378 + (i * x63));
                             reg63.CARR = rst.getString("ASR").substring(7378 + (i * x63), 7382 + (i * x63));
                             reg63.FTNR = rst.getString("ASR").substring(7383 + (i * x63), 7388 + (i * x63));
                             reg63.DAIS = rst.getString("ASR").substring(7321 + (i * x63), 7327 + (i * x63));
                             reg63.RBKD = rst.getString("ASR").substring(7388 + (i * x63), 7390 + (i * x63));
                             reg63.FTDA = rst.getString("ASR").substring(7390 + (i * x63), 7395 + (i * x63));
                             reg63.FTDT = rst.getString("ASR").substring(7396 + (i * x63), 7401 + (i * x63));
                             reg63.FBST = "";//rst.getString("ASR").substring();
                             reg63.FBTD = rst.getString("ASR").substring(7408 + (i * x63), 7423 + (i * x63));
                             reg63.NBDA = "";//rst.getString("ASR").substring();
                             reg63.NADA = "";//rst.getString("ASR").substring();*/
                            try {
                                if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                    reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                } else {
                                    reg63.strDescFrom = reg63.ORAC;
                                }
                                if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                    reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                } else {
                                    reg63.strDescTo = reg63.DSTC;
                                }
                            } catch (Exception e) {
                            }

                            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                            //OBTENIENDO DATOS DEL USO =================================
                            boolean encontroUso = false;
                            // VOLADO 
                            strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                    + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                    + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                    + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                    + "' AND CUPON = '" + (i + 1) + "' ";
                            stmt = cnx.prepareStatement(strSQLUSO);
                            stmt.execute();
                            rst2 = stmt.getResultSet();
                            //rst2 = stmt.executeQuery(strSQLUSO);
                            if (rst2.next()) {
                                encontroUso = true;
                                reg63.strUso = "F";
                                reg63.strDesUso = "Flown";
                                reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                reg63.dblMontoUso = rst2.getDouble("VCPN");
                            }
                            try {
                                rst2.close();
                            } catch (SQLException e) {
                                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                            }
                            rst2 = null;

                            //DISCHARGE
                            if (!encontroUso) {
                                strSQLUSO = "SELECT FECR, VCPN FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "D";
                                    reg63.strDesUso = "Discharges";
                                    reg63.strFecUso = rst2.getString("FECR").trim();
                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //EMD
                            if (!encontroUso) {
                                strSQLUSO = "SELECT DFLIGHT, VCPN FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                        + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "F";
                                    reg63.strDesUso = "Flown";
                                    reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                    reg63.dblMontoUso = rst2.getDouble("VCPN");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //BILLED
                            if (!encontroUso) {
                                strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                        + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                        + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                        + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                        + "' AND A020CUPON = '" + (i + 1) + "' ";

                                stmt = cnx.prepareStatement(strSQLUSO);
                                stmt.execute();
                                rst2 = stmt.getResultSet();
                                //rst2 = stmt.executeQuery(strSQLUSO);
                                if (rst2.next()) {
                                    encontroUso = true;
                                    reg63.strUso = "B";
                                    reg63.strDesUso = "Billed";
                                    reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                    reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                }
                                try {
                                    rst2.close();
                                } catch (SQLException e) {
                                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                }
                                rst2 = null;
                            }

                            //</editor-fold>
                            lstReg63.add(reg63);
                        }
                    }
                    if (stmt != null) {
                        stmt.close();
                    }

                    //RECORD 64 - Document Amounts
                    //if (rst.getString("ASR").substring(7852, 7855).trim().length() > 0) {
                    if (rst.getString("ASR").substring(11402, 11405).trim().length() > 0) {
                        double total;
                        String total_s;
                        String equivalent_s;
                        String regTax;
                        String regTax2 = "MXN 0.00";
                        String regTax3 = "MXN 0.00";
                        beanFacsimil.CUTP1 = rst.getString("ASR").substring(11540, 11543);
                        beanFacsimil.FARE = rst.getString("ASR").substring(11443, 11454) + "." + rst.getString("ASR").substring(11454, 11456);
                        equivalent_s = rst.getString("ASR").substring(11457, 11468) + "." + rst.getString("ASR").substring(11468, 11470);
                        if (rst.getString("ASR").substring(11544, 11547).trim().length() > 0) {
                            beanFacsimil.EQFR = rst.getString("ASR").substring(11544, 11547) + equivalent_s;
                        } else {
                            beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                        }
                        regTax = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(11490, 11501)) + "." + rst.getString("ASR").substring(11501, 11503);
                        lstTaxes.add(regTax);
                        if (Long.parseLong(rst.getString("ASR").substring(11504, 11515)) > 0) {
                            regTax2 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(11504, 11515)) + "." + rst.getString("ASR").substring(11515, 11517);
                            lstTaxes.add(regTax2);
                        }
                        if (Long.parseLong(rst.getString("ASR").substring(11518, 11529)) > 0) {
                            regTax3 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(11518, 11529)) + "." + rst.getString("ASR").substring(11529, 11531);
                            lstTaxes.add(regTax3);
                        }
                        /*beanFacsimil.CUTP1 = rst.getString("ASR").substring(7990, 7993);
                         beanFacsimil.FARE = rst.getString("ASR").substring(7893, 7904) + "." + rst.getString("ASR").substring(7904, 7906);
                         equivalent_s = rst.getString("ASR").substring(7907, 7918) + "." + rst.getString("ASR").substring(7918, 7920);
                         if (rst.getString("ASR").substring(7994, 7997).trim().length() > 0) {
                         beanFacsimil.EQFR = rst.getString("ASR").substring(7994, 7997) + equivalent_s;
                         } else {
                         beanFacsimil.EQFR = beanFacsimil.CUTP1 + equivalent_s;
                         }
                         regTax = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(7940, 7951)) + "." + rst.getString("ASR").substring(7951, 7953);
                         lstTaxes.add(regTax);
                         if (Long.parseLong(rst.getString("ASR").substring(7954, 7965)) > 0) {
                         regTax2 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(7954, 7965)) + "." + rst.getString("ASR").substring(7965, 7967);
                         lstTaxes.add(regTax2);
                         }
                         if (Long.parseLong(rst.getString("ASR").substring(7968, 7979)) > 0) {
                         regTax3 = beanFacsimil.EQFR.substring(0, 3) + " " + Long.parseLong(rst.getString("ASR").substring(7968, 7979)) + "." + rst.getString("ASR").substring(7979, 7981);
                         lstTaxes.add(regTax3);
                         }*/
                        if (Double.parseDouble(equivalent_s) > 0) {
                            total = Double.parseDouble(equivalent_s) + Double.parseDouble(regTax.substring(4)) + Double.parseDouble(regTax2.substring(4)) + Double.parseDouble(regTax3.substring(4));
                        } else {
                            total = Double.parseDouble(beanFacsimil.FARE) + Double.parseDouble(regTax.substring(4)) + Double.parseDouble(regTax2.substring(4)) + Double.parseDouble(regTax3.substring(4));
                        }
                        total_s = total + "";
                        beanFacsimil.TOTL = total_s;
                    }
                    //RECORD 65 - Passenger Information
                    //beanFacsimil.PXNM = rst.getString("ASR").substring(8039, 8088);
                    beanFacsimil.PXNM = rst.getString("ASR").substring(11589, 11638);
                    //RECORD 81 - Fare Calculation
                    int x81 = 136;
                    for (int i = 0; i < 4; i++) {
                        if (rst.getString("ASR").substring(13348 + (i * x81), 13351 + (i * x81)).trim().length() > 0) {
                            String FC = rst.getString("ASR").substring(13392 + (i * x81), 13479 + (i * x81));
                            lstFC.add(FC);
                        }
                        /*if (rst.getString("ASR").substring(9798 + (i * x81), 9801 + (i * x81)).trim().length() > 0) {
                         String FC = rst.getString("ASR").substring(9842 + (i * x81), 9929 + (i * x81));
                         lstFC.add(FC);
                         }*/
                    }
                    //Verificando Cantidad de Conjunciones
                    //if (Integer.parseInt(rst.getString("ASR").substring(11762, 11763)) == 0) {
                    if (Integer.parseInt(rst.getString("ASR").substring(15312, 15313)) == 0) {
                        //RECORD 84 - Form of Payment
                        int x84 = 138;
                        for (int i = 0; i < 6; i++) {
                            if (rst.getString("ASR").substring(13892 + (i * x84), 13895 + (i * x84)).trim().length() > 0) {
                                String strFPTP = rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim();
                                if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                    beanFacsimil.strIssExc += " / " + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84));
                                }
                                if (Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) > 0) {
                                    String monto = Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) + "." + rst.getString("ASR").substring(13938 + (i * x84), 13940 + (i * x84));
                                    if (rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("CC") || rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("TC")) {
                                        if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                        } else {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim());
                                        }
                                    } else {
                                        if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                        } else {
                                            lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto);
                                        }
                                    }
                                }
                            }
                            /*if (rst.getString("ASR").substring(10342 + (i * x84), 10345 + (i * x84)).trim().length() > 0) {
                             String strFPTP = rst.getString("ASR").substring(10367, 10369).trim();
                             if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) && i == 0) {
                             beanFacsimil.strIssExc += " / " + rst.getString("ASR").substring(10390, 10409);
                             }
                             if (Long.parseLong(rst.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) > 0) {
                             String monto = Long.parseLong(rst.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) + "." + rst.getString("ASR").substring(10388 + (i * x84), 10390 + (i * x84));
                             if (rst.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("CC") || rst.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("TC")) {
                             if (rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                             } else {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim());
                             }
                             } else {
                             if (rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                             } else {
                             lstFOP.add("Type:" + rst.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto);
                             }
                             }
                             }
                             }*/
                        }
                    } else {
                        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                        cs2 = cnx.prepareCall(strSQL);
                        //long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("ASR").substring(11762, 11763));
                        long newTDNR = Long.parseLong(filter.TDNR.substring(0, 13).trim()) + Integer.parseInt(rst.getString("ASR").substring(15312, 15313));
                        String newTDNR_s = newTDNR + "  " + rst.getString("ASR").substring(15, 31) + filter.TDNR.substring(0, 13).trim();
                        cs2.setString(1, newTDNR_s);
                        cs2.execute();

                        rst2 = cs2.getResultSet();
                        while (rst2.next()) {
                            //RECORD 84 - Form of Payment
                            int x84 = 138;
                            for (int i = 0; i < 6; i++) {
                                if (rst.getString("ASR").substring(13892 + (i * x84), 13895 + (i * x84)).trim().length() > 0) {
                                    //String strFPTP = rst.getString("ASR").substring(13917, 13919).trim();
                                    String strFPTP = rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim();
                                    if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) /*&& i == 0*/) {
                                        beanFacsimil.strIssExc += " / " + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84));
                                    }
                                    if (Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) > 0) {
                                        String monto = Long.parseLong(rst.getString("ASR").substring(13927 + (i * x84), 13938 + (i * x84))) + "." + rst.getString("ASR").substring(13938 + (i * x84), 13940 + (i * x84));
                                        if (rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("CC") || rst.getString("ASR").substring(13917 + (i * x84), 13919 + (i * x84)).trim().equals("TC")) {
                                            if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim() + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst.getString("ASR").substring(13940 + (i * x84), 13959 + (i * x84)).trim());
                                            }
                                        } else {
                                            if (rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim().length() > 0) {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst.getString("ASR").substring(13968 + (i * x84), 13974 + (i * x84)).trim());
                                            } else {
                                                lstFOP.add("Type:" + rst.getString("ASR").substring(13917 + (i * x84), 13927 + (i * x84)).trim() + "  Amount: " + monto);
                                            }
                                        }
                                    }
                                }
                                /*if (rst2.getString("ASR").substring(10342 + (i * x84), 10345 + (i * x84)).trim().length() > 0) {
                                 String strFPTP = rst2.getString("ASR").substring(10367, 10369).trim();
                                 if ((strFPTP.trim().equals("EX") || strFPTP.trim().equals("ET")) && i == 0) {
                                 beanFacsimil.strIssExc += " / " + rst2.getString("ASR").substring(10390, 10409);
                                 }
                                 if (Long.parseLong(rst2.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) > 0) {
                                 String monto = Long.parseLong(rst2.getString("ASR").substring(10377 + (i * x84), 10388 + (i * x84))) + "." + rst2.getString("ASR").substring(10388 + (i * x84), 10390 + (i * x84));
                                 if (rst2.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("CC") || rst2.getString("ASR").substring(10367 + (i * x84), 10369 + (i * x84)).trim().equals("TC")) {
                                 if (rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim() + "  Approval Code:" + rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                                 } else {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Account:" + rst2.getString("ASR").substring(10390 + (i * x84), 10409 + (i * x84)).trim());
                                 }
                                 } else {
                                 if (rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim().length() > 0) {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto + "  Approval Code:" + rst2.getString("ASR").substring(10418 + (i * x84), 10424 + (i * x84)).trim());
                                 } else {
                                 lstFOP.add("Type:" + rst2.getString("ASR").substring(10367 + (i * x84), 10377 + (i * x84)).trim() + "  Amount: " + monto);
                                 }
                                 }
                                 }
                                 }*/
                            }
                        }
                        try {
                            cs2.close();
                        } catch (SQLException e) {
                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                        }
                    }
                    beanFacsimil.strFinCjn = rst.getString("ASR").substring(44, 45);
                    beanFacsimil.strEsCjn = rst.getString("ASR").substring(30, 31);
                    strConj = rst.getString("ASR").substring(31, 44);
                    //for (int i = 0; i < Integer.parseInt(rst.getString("ASR").substring(11762, 11763)); i++) {
                    for (int i = 0; i < Integer.parseInt(rst.getString("ASR").substring(15312, 15313)); i++) {
                        long cjn = Long.parseLong(rst.getString("ASR").substring(31, 44)) + (i + 1);
                        String cjn_s = cjn + "";
                        strConj = strConj + " - " + cjn_s.substring(9);
                    }
                } else {
                    beanFacsimil.strMsj = rst.getString("ASR").substring(52, 132);
                    //NOT-FOUND - A pedido de ENS 20140905, si no se encuentra el Ticket de todas maneras se busca
                    //el uso del cupón consultado (VENTA NO REPORTADA)
                    if (beanFacsimil.strMsj.contains("NOT-FOUND")) {
                        try {
                            //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                            int VL_CPUI = 0;

                            //for (int i = 1; i <= Integer.parseInt(filter.CPUI); i++) {
                            for (int i = 1; i <= VL_CPUI; i++) {
                                //if (i == Integer.parseInt(filter.CPUI)) {
                                if (i == VL_CPUI) {
                                    reg63 = new BSPF63();

                                    // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL USO">
                                    //OBTENIENDO DATOS DEL USO =================================
                                    boolean encontroUso = false;
                                    // VOLADO 
                                    strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                            + "FROM " + session.getMainLibrary() + ".A1692 WHERE CCUST = '" + ccust.trim()
                                            + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                            + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                            + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                            + "' AND CUPON = '" + i + "' ";

                                    stmt = cnx.prepareStatement(strSQLUSO);
                                    stmt.execute();
                                    rst2 = stmt.getResultSet();
                                    //rst2 = stmt.executeQuery(strSQLUSO);

                                    if (rst2.next()) {
                                        encontroUso = true;
                                        reg63.ORAC = rst2.getString("CDEPART").trim();
                                        reg63.DSTC = rst2.getString("CARRIVA").trim();
                                        reg63.CARR = rst2.getString("CARR").trim();
                                        reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                        reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                        reg63.RBKD = rst2.getString("CLAS").trim();
                                        reg63.FBTD = rst2.getString("FBASE").trim();
                                        reg63.strUso = "F";
                                        reg63.strDesUso = "Flown";
                                        reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                        reg63.dblMontoUso = rst2.getDouble("VCPN");
                                    }
                                    try {
                                        rst2.close();
                                    } catch (SQLException e) {
                                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                    }
                                    rst2 = null;

                                    //DISCHARGE
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, FECR, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1747 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("FECR").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
                                            reg63.strUso = "D";
                                            reg63.strDesUso = "Discharges";
                                            reg63.strFecUso = rst2.getString("FECR").trim();
                                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //EMD
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT CDEPART, CARRIVA, DFLIGHT, NFLIGHT, CARR, CLAS, FBASE, VCPN "
                                                + "FROM " + session.getMainLibrary() + ".A1818 WHERE CCUST = '" + ccust.trim()
                                                + "' AND CCIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND CUPON = '" + i + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);

                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.ORAC = rst2.getString("CDEPART").trim();
                                            reg63.DSTC = rst2.getString("CARRIVA").trim();
                                            reg63.CARR = rst2.getString("CARR").trim();
                                            reg63.FTNR = rst2.getString("NFLIGHT").trim();
                                            reg63.DAIS = rst2.getString("DFLIGHT").trim();
                                            reg63.RBKD = rst2.getString("CLAS").trim();
                                            reg63.FBTD = rst2.getString("FBASE").trim();
                                            reg63.strUso = "F";
                                            reg63.strDesUso = "Flown";
                                            reg63.strFecUso = rst2.getString("DFLIGHT").trim();
                                            reg63.dblMontoUso = rst2.getDouble("VCPN");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //BILLED
                                    if (!encontroUso) {
                                        strSQLUSO = "SELECT A020SUFECH, A020SUDEBI FROM " + session.getMainLibrary() + ".A020 WHERE "
                                                + " A020CIA = '" + filter.TDNR.trim().substring(0, 3)
                                                + "' AND A020FORMA = '" + filter.TDNR.trim().substring(3, 7)
                                                + "' AND A020SERIE = '" + filter.TDNR.trim().substring(7, 13)
                                                + "' AND A020CUPON = '" + (i + 1) + "' ";

                                        stmt = cnx.prepareStatement(strSQLUSO);
                                        stmt.execute();
                                        rst2 = stmt.getResultSet();
                                        //rst2 = stmt.executeQuery(strSQLUSO);
                                        if (rst2.next()) {
                                            encontroUso = true;
                                            reg63.strUso = "B";
                                            reg63.strDesUso = "Billed";
                                            reg63.strFecUso = rst2.getString("A020SUFECH").trim();
                                            reg63.dblMontoUso = rst2.getDouble("A020SUDEBI");
                                        }
                                        try {
                                            rst2.close();
                                        } catch (SQLException e) {
                                            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                                        }
                                        rst2 = null;
                                    }

                                    //</editor-fold>
                                    try {
                                        if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                            reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                        } else {
                                            reg63.strDescFrom = reg63.ORAC;
                                        }
                                        if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                            reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                        } else {
                                            reg63.strDescTo = reg63.DSTC;
                                        }
                                    } catch (Exception e) {
                                    }
                                    lstReg63.add(reg63);
                                } else {
                                    reg63 = new BSPF63();
                                    lstReg63.add(reg63);
                                }
                            }
                            if (stmt != null) {
                                stmt.close();
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            beanFacsimil.lstReg46Restrict = lstReg46Restrict;
            beanFacsimil.lstReg46OrigIssue = lstReg46OrigIssue;
            beanFacsimil.lstReg63 = lstReg63;
            beanFacsimil.lstFC = lstFC;
            beanFacsimil.lstFOP = lstFOP;
            beanFacsimil.lstTaxes = lstTaxes;
            beanFacsimil.strConjuncion = strConj;
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            if (stmt != null) {
                stmt.close();
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

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
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs2 != null) {
                try {
                    cs2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return beanFacsimil;
    }

    public String searchDelivery(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strTEXTO = "";
        Connection cnx = null;
        try {
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                //ARC
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S01A1347(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S01A1347(?,?,?,?)}"; //Cambio ROLLING
            } else if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
                //ASR
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S02A1536(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S02A1536(?,?,?,?)}"; //Cambio ROLLING
            } else if (fuente.trim().equals("B") || fuente.trim().equals("BSP")){
                //BSP
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348(?,?,?,?)}"; //Cambio ROLLING
            } else {
                //ISR
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S04A1419(?,?)}"; //Cambio ROLLING
            }
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, ccust);
            if(!fuente.equals("I")){
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.SEQTKT.trim()); //Cambio ROLLING
            cs.setString(4, filter.IDFILE.trim()); //Cambio ROLLING
            } else {
                cs.setString(2, filter.TDNR.trim());
            }
            cs.execute();
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TKTN")
                            + rst.getString("CDGT") + rst.getString("ARCMAXLONG") + "\n";
                }
            } else if(fuente.trim().equals("I")) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("RCID")
                            + rst.getString("SQNR")
                            + rst.getString("TDNR")
                            + rst.getString("CDGT") + rst.getString("TCNMAXLONG") + "\n";
                }
            }else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TDNR")
                            + rst.getString("CDGT") + rst.getString("BSPMAXLONG") + "\n";
                }
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return strTEXTO;
    }

    public List<FACSIMILFilter> loadSQP00778(String ccust, FACSIMILFilter filter) throws SQLException, Exception {
        List<FACSIMILFilter> lstRtn = new ArrayList<FACSIMILFilter>(0);
        FACSIMILFilter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00778_1(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, ccust);
            cstmt01.setString(2, filter.TDNR.substring(0, 3).trim());//CIA
            cstmt01.setString(3, filter.TDNR.substring(3, 7).trim());//FORMA
            cstmt01.setString(4, filter.TDNR.substring(7, 13).trim());//SERIE
            // cstmt01.setString(5, filter.strTUSO.trim());//SERIE

            cstmt01.execute();
            rst = cstmt01.getResultSet();

            while (rst.next()) {
                objRtn = new FACSIMILFilter();
                objRtn.pos = rst.getInt("RN");
                objRtn.A020CIA = rst.getString("A020CIA").trim();
                objRtn.A020FORMA = rst.getString("A020FORMA").trim();
                objRtn.A020SERIE = rst.getString("A020SERIE").trim();
                objRtn.A020CUPON = rst.getString("A020CUPON").trim();
                objRtn.A020DCHEQ = rst.getString("A020DCHEQ").trim();
                objRtn.A020FRECHA = rst.getString("A020FRECHA").trim();
                objRtn.A020GRUPOTUSO = rst.getString("A020GRUPO").trim() + " - " + rst.getString("A020TUSO").trim();
                objRtn.A020MNRCD = rst.getString("A020MNRCD").trim();
                objRtn.A020SUDEBI = rst.getDouble("A020SUDEBI");
                objRtn.A020TOTDEB = rst.getDouble("A020TOTDEB");
                objRtn.A020IMPNAC = rst.getDouble("A020IMPNAC");
                objRtn.A020ACEPTA = rst.getDouble("A020ACEPTA");
                objRtn.A020IMPINT = rst.getDouble("A020IMPINT");
                objRtn.A020TOTHAB = rst.getDouble("A020TOTHAB");
                objRtn.A020REDEBI = rst.getDouble("A020REDEBI");
                objRtn.A020COMISP = rst.getDouble("A020COMISP");
                objRtn.A020COMISI = rst.getDouble("A020COMISI");
                objRtn.A020TAX = rst.getDouble("A020TAX");
                objRtn.A020ANALIZ = rst.getDouble("A020ANALIZ");
                objRtn.A020FVENTA = rst.getString("A020FVENTA").trim();
                objRtn.A020FUSO = rst.getString("A020FUSO").trim();
                objRtn.A020RUTAP = rst.getString("A020RUTAP").trim();
                objRtn.A020RUTA = rst.getString("A020RUTA").trim();
                objRtn.A020KEY = rst.getString("A020KEY").trim();
                objRtn.A020USER = rst.getString("A020USER").trim();
                objRtn.A020SDATE = rst.getString("A020SDATE").trim();
                objRtn.A020STIME = rst.getString("A020STIME").trim();
                objRtn.A020RMSN = rst.getString("A020RMSN").trim();
                objRtn.A020NETO = rst.getDouble("A020NETO");
                objRtn.A020BASE = rst.getString("A020BASE").trim();
                objRtn.A020AIRLI3 = rst.getString("A020AIRLI3").trim();
                objRtn.A020SUFECH = rst.getString("A020SUFECH").trim();
                objRtn.A020TUSO = rst.getString("A020TUSO").trim();
                objRtn.A020TIPORM = rst.getString("A020TIPORM");
                if (rst.getString("A020RMANT").trim().equals("000000000")) {
                    objRtn.A020RMANT = "";
                } else {
                    objRtn.A020RMANT = rst.getString("A020RMANT");
                }
                objRtn.Neto1 = rst.getDouble("A020SUDEBI") - rst.getDouble("A020IMPNAC") + rst.getDouble("A020TOTDEB");
                objRtn.Neto2 = rst.getDouble("A020ACEPTA") - rst.getDouble("A020IMPINT") + rst.getDouble("A020TOTHAB");
                objRtn.Titulo = " TICKET NUMBER:  " + rst.getString("A020CIA") + rst.getString("A020FORMA") + rst.getString("A020SERIE")
                        + "  " + rst.getString("A020CUPON") + "     ROUTING :  " + rst.getString("A020RUTA");
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    objRtn.Titulo2 = " COD AIRLINE:  " + rst.getString("A020AIRLI3") + " - " + rst.getString("A005KEY2");
                    objRtn.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    objRtn.Titulo2 = " COD AIRLINE:  " + rst.getString("A020AIRLI3") + " - " + rst.getString("A005KEY3");
                    objRtn.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                objRtn.strTUSO = rst.getString("A020TUSO").trim();
                if (rst.getString("A020TIPORM") != null && rst.getString("A020TIPORM").trim().equals("X")) {
                    objRtn.strFlag = "RM";
                }

                lstRtn.add(objRtn);
            }
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

    public String searchDeliveryRFND(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strTEXTO = "";
        Connection cnx = null;
        try {
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                //ARC--En caso cambien a Reembolso y que no buesque siempre venta seria: " + session.getMainLibrary() + ".PX01S01A1347RFND
                //ARC--En caso cambien a Venta seria: " + session.getMainLibrary() + ".PX01S01A1347
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S01A1347RFND(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S01A1347RFND(?,?,?,?)}"; //Cambio ROLLING
            } else if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
                //ASR--En caso cambien a Reembolso y que no buesque siempre venta seria: " + session.getMainLibrary() + ".PX01S02A1536RFND
                //ASR--En caso cambien a Venta seria: " + session.getMainLibrary() + ".PX01S02A1536
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S02A1536RFND(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S02A1536RFND(?,?,?,?)}"; //Cambio ROLLING
            } else {
                //BSP--En caso cambien a Reembolso y que no buesque siempre venta seria: " + session.getMainLibrary() + ".PX01S03A1348RFND
                //BSP--En caso cambien a Venta seria: " + session.getMainLibrary() + ".PX01S03A1348
                //strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348RFND(?,?)}";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348RFND(?,?,?,?)}"; //Cambio ROLLING
            }
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.SEQTKT.trim()); //Cambio ROLLING
            cs.setString(4, filter.IDFILE.trim()); //Cambio ROLLING
            cs.execute();
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TKTN")
                            + rst.getString("CDGT") + rst.getString("ARCMAXLONG") + "\n";
                }
            } else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TDNR")
                            + rst.getString("CDGT") + rst.getString("BSPMAXLONG") + "\n";
                }
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return strTEXTO;
    }

    public String searchDeliveryMEMO(String ccust, FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strTEXTO = "";
        Connection cnx = null;
        try {
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                //ARC
                //strSQL = "{CALL PRAXIS.PX01S01A1347MEMO(?,?)}";
                strSQL = "{CALL PRAXIS.PX01S01A1347MEMO(?,?,?,?)}"; //Cambio ROLLING
            } else if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
                //ASR
                //strSQL = "{CALL PRAXIS.PX01S02A1536MEMO(?,?)}";
                strSQL = "{CALL PRAXIS.PX01S02A1536MEMO(?,?,?,?)}"; //Cambio ROLLING
            } else {
                //BSP
                //strSQL = "{CALL PRAXIS.PX01S03A1348MEMO(?,?)}";
                strSQL = "{CALL PRAXIS.PX01S03A1348MEMO(?,?,?,?)}"; //Cambio ROLLING
            }
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.SEQTKT.trim()); //Cambio ROLLING
            cs.setString(4, filter.IDFILE.trim()); //Cambio ROLLING
            cs.execute();
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TKTN")
                            + rst.getString("CDGT") + rst.getString("ARCMAXLONG") + "\n";
                }
            } else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TDNR")
                            + rst.getString("CDGT") + rst.getString("BSPMAXLONG") + "\n";
                }
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return strTEXTO;
    }

    public List<FACSIMILFilter> searchAgent(String AGTN) throws SQLException, Exception {
        List<FACSIMILFilter> lstRtn = new ArrayList<FACSIMILFilter>(0);
        FACSIMILFilter beanFacsimil;

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXA003(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, AGTN);
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.strNomAero = rst.getString("STRNOMAEREO").trim();
                beanFacsimil.AGTN = AGTN;
                beanFacsimil.strNombreAgente = rst.getString("STRNOMBREAGENTE").trim();
                beanFacsimil.strDirecAgente = rst.getString("STRDIRECAGENTE").trim();
                beanFacsimil.COUNTRY = rst.getString("A003PSALF");
                beanFacsimil.A720DISTRI = rst.getString("A003DISTRI");
                beanFacsimil.A720DEPART = rst.getString("A003DEPART");
                beanFacsimil.A720ZIPCOD = rst.getString("A003ZIPCOD");
                beanFacsimil.A720NAME = rst.getString("A003KEY3");
                beanFacsimil.A720PROMOT = rst.getString("A003PROMOT");
                beanFacsimil.A720CONTA1 = rst.getString("A003CONTA1");
                beanFacsimil.A720CONTA2 = rst.getString("A003CONTA2");

                lstRtn.add(beanFacsimil);
            }
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

    public List<FACSIMILFilter> searchA720(String TDNR, String VTR) throws SQLException, Exception {
        List<FACSIMILFilter> lstRtn = new ArrayList<FACSIMILFilter>(0);
        FACSIMILFilter beanFacsimil;
        A720Filter beanCpn;
        List<A720Filter> lstRegA720 = new ArrayList<A720Filter>();
        HashMap hmValueA720 = new HashMap();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;
        VTR = TDNR.substring(0, 3).equals("139") ? VTR:"ISR";
        String SQLCLL01 = "";
        if (VTR.equals("VTR")) {
            SQLCLL01 = "{CALL PRAXIS.SQP03790(?,?,?,?)}"; // PXVTR
        } else if (VTR.equals("OLD")) {
            SQLCLL01 = "{CALL PRAXIS.SQP03789(?,?,?,?)}"; // PXHST
        } else if (VTR.equals("ISR")) {
            SQLCLL01 = "{CALL PRAXIS.SQP03788_ISR(?,?,?,?)}"; // PXA720_1 
        } else {
            SQLCLL01 = "{CALL PRAXIS.SQP03788(?,?,?,?)}"; // PXA720_1 
        }

        Boolean noVTROLD = !VTR.equals("VTR") && !VTR.equals("OLD");

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, TDNR.substring(0, 3));
            cstmt01.setString(3, TDNR.substring(3, 7));
            cstmt01.setString(4, TDNR.substring(7));
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.A720REGIST = rst.getString("A720REGIST").trim();
                beanFacsimil.A720FREGIS = rst.getString("A720FREGIS").trim();
                beanFacsimil.A720REVISA = rst.getString("A720REVISA").trim();
                beanFacsimil.A720FREVIS = rst.getString("A720FREVIS").trim();
                beanFacsimil.A720GRUPO = rst.getString("A720GRUPO").trim();
                beanFacsimil.A720ORIG = rst.getString("A720ORIG").trim();
                beanFacsimil.A720FLAG = rst.getString("A720FLAG").trim();
                beanFacsimil.A720CTKTC = rst.getInt("A720CTKTC");
                beanFacsimil.A720PRO = rst.getString("A720PRO").trim();
                beanFacsimil.A720MONREG = rst.getString("A720MONREG").trim();
                beanFacsimil.A720FECVTA = rst.getString("A720FECVTA").trim();
                beanFacsimil.A720CIUVTA = rst.getString("A720CIUVTA").trim();
                beanFacsimil.A720PAIVTA = rst.getString("A720PAIVTA").trim();
                beanFacsimil.A720CIUEMI = rst.getString("A720CIUEMI").trim();
                beanFacsimil.A720PAIEMI = rst.getString("A720PAIEMI").trim();
                beanFacsimil.A720COMMIS = rst.getDouble("A720COMMIS");
                beanFacsimil.A720MDACOM = rst.getString("A720MDACOM").trim();
                beanFacsimil.A720PORCOM = rst.getDouble("A720PORCOM");
                beanFacsimil.A720CODIT = rst.getString("A720CODIT").trim();
                beanFacsimil.A720INITRA = rst.getString("A720INITRA").trim();
                beanFacsimil.A720TAJUST = rst.getDouble("A720TAJUST");
                beanFacsimil.A720TAJUSQ = rst.getDouble("A720TAJUSQ");
                beanFacsimil.A720TARIFA = rst.getDouble("A720TARIFA");
                beanFacsimil.A720TRFPAG = rst.getDouble("A720TRFPAG");
                beanFacsimil.A720TRFNUC = rst.getDouble("A720TRFNUC");
                beanFacsimil.A720ROE = rst.getDouble("A720ROE");
                beanFacsimil.A720CPLUSS = rst.getDouble("A720CPLUSS");
                beanFacsimil.A720CSOVER = rst.getDouble("A720CSOVER");
                beanFacsimil.A720QSOVER = rst.getInt("A720QSOVER");
                beanFacsimil.A720MONEDA = rst.getString("A720MONEDA").trim();
                beanFacsimil.A720MDAPAG = rst.getString("A720MDAPAG").trim();
                beanFacsimil.A1530STPRO = "VTR";
                if (!VTR.equals("VTR") && !VTR.equals("OLD")) {
                    if (rst.getString("A1530STPRO").trim().equals("1")) {
                        beanFacsimil.A1530STPRO = "CLOSED";
                    } else {
                        beanFacsimil.A1530STPRO = "OPEN";
                    }
                    beanFacsimil.strOthers = "User of Update : " + rst.getString("A1530USRAC").trim()
                            + " / " + rst.getString("A1530FECAC").trim() + " / " + rst.getString("A1530HORAC").trim();
                }

                /*
                 if(rst.getString("A720STAT").trim().equals("0")){
                 beanFacsimil.A720STAT = "Without Prorate";
                 }else if(rst.getString("A720STAT").trim().equals("1")){
                 beanFacsimil.A720STAT = "Prorated";
                 }else if(rst.getString("A720STAT").trim().equals("2")){
                 beanFacsimil.A720STAT = "Prorate Error";
                 }else if(rst.getString("A720STAT").trim().equals("3")){
                 beanFacsimil.A720STAT = "Original Data Error";
                 }else{
                 beanFacsimil.A720STAT = rst.getString("A720STAT").trim();
                 }
                 */
                beanFacsimil.A720STAT = rst.getString("A720STAT").trim();
                if (VTR.equals("VTR") || VTR.equals("OLD")) {
                    beanFacsimil.A1345FEXCH = "";
                    beanFacsimil.A1345CURR = "";
                    beanFacsimil.A1345FARE = 0.00;
                    beanFacsimil.A1345PGCUR = "";
                    beanFacsimil.A1345PAGO = 0.00;
                    beanFacsimil.A720STAT = rst.getString("A720STAT").trim() + "-VTR";
                } else {
                    beanFacsimil.A1345FEXCH = rst.getString("A720TRNCU").trim();
                    beanFacsimil.A1345CURR = rst.getString("A720MDAFA").trim();
                    beanFacsimil.A1345FARE = rst.getDouble("A720FARE");
                    beanFacsimil.A1345PGCUR = rst.getString("A720MDAAD").trim();
                    beanFacsimil.A1345PAGO = rst.getDouble("A720ADC");
                }
                beanFacsimil.A1345NRPRT = "";//rst.getString("A1345NRPRT").trim();
                beanCpn = null;
                for (int i = 1; i < 5; i++) {
                    if (!rst.getString("A720RUTA" + i).trim().equals("")) {
                        beanCpn = new A720Filter();
                        beanCpn.A720RUTAO = noVTROLD ? rst.getString("A720ORIGC" + i).trim() : rst.getString("A720RUTA" + (i - 1)).trim();
                        beanCpn.A720RUTAD = noVTROLD ? rst.getString("A720DESTC" + i).trim() : rst.getString("A720RUTA" + i).trim();
                        beanCpn.A720CONEX = rst.getString("A720CONEX" + i).trim();
                        beanCpn.A720CARRA = rst.getString("A720CARRA" + i).trim();
                        beanCpn.A720NVLO = rst.getString("A720NVLO" + i).trim();
                        beanCpn.A720FVLO = rst.getString("A720FVLO" + i).trim();
                        beanCpn.A720BOOKI = rst.getString("A720BOOKI" + i).trim();
                        beanCpn.A720CLASE = rst.getString("A720CLASE" + i).trim();
                        beanCpn.A720FBUSO = rst.getString("A720FBUSO" + i).trim();
                        beanCpn.A720FARE = rst.getDouble("A720FARE" + i);
                        beanCpn.A720TFARE = rst.getString("A720TFARE" + i).trim();
                        beanCpn.A720SS = rst.getDouble("A720SS" + i);
                        beanCpn.A720VLSRP = rst.getDouble("A720VLSRP" + i);
                        beanCpn.A720VLMPA = rst.getDouble("A720VLMPA" + i);
                        beanCpn.A720ACUE = rst.getDouble("A720ACUE" + i);
                        beanCpn.A720ISC = rst.getDouble("A720ISC" + i);
                        beanCpn.A720VALOR = rst.getDouble("A720VALOR" + i);
                        beanCpn.A720AJUST = rst.getDouble("A720AJUST" + i);
                        beanCpn.A720ACUEO = rst.getDouble("A720ACUEO" + i);
                        beanCpn.A720QIN = rst.getDouble("A720Q" + i);
                        beanCpn.A720YQ = rst.getDouble("A720YQ" + i);
                        beanCpn.A720FACT = rst.getDouble("A720FACT" + i);
                        beanCpn.A720PPRO = rst.getDouble("A720PPRO" + i);
                        beanCpn.A720PROV = rst.getDouble("A720PROV" + i);
                        beanCpn.A720PRRCM = rst.getDouble("A720PRRCM" + i);
                        beanCpn.A720PRSCM = rst.getDouble("A720PRSCM" + i);
                        beanCpn.A720INDPR = rst.getString("A720INDPR" + i);
                        //Temporal
                        beanCpn.A720LRRCM = rst.getDouble("A720PRRCM" + i);
                        beanCpn.A720LRSCM = rst.getDouble("A720PRSCM" + i);

                        beanCpn.A720LYQ = rst.getDouble("A720LYQ" + i);
                        beanCpn.A720LIV = rst.getDouble("A720LIV" + i);

                        lstRegA720.add(beanCpn);
                        hmValueA720.put(rst.getString("A720CIA").trim() + rst.getString("A720FORMA").trim() + rst.getString("A720SERIE").trim() + i, rst.getDouble("A720VALOR" + i));
                    }
                }

                beanFacsimil.lstRegA720 = lstRegA720;
                beanFacsimil.A1526RATE = rst.getDouble("A720TCAMB");
                beanFacsimil.A720TCAMB = rst.getDouble("A720TCAMB");
                if (VTR.equals("VTR") || VTR.equals("OLD")) {
                    beanFacsimil.A720TRNCU = "";
                    beanFacsimil.A720TKVOID = "";
                } else {
                    beanFacsimil.A720TRNCU = rst.getString("A720TRNCU");
                    beanFacsimil.A720TKVOID = rst.getString("A720TKVOID");
                }
                beanFacsimil.dblTarifa = 0.00;
                beanFacsimil.strMonTarifa = "";
                lstRtn.add(beanFacsimil);
            }
        } catch (Exception ex) {
            String err = ex.getMessage();
            System.out.println(err);
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
        return lstRtn;
    }

    public List<FACSIMILFilter> searchA730(String TDNR, String TCNR) throws SQLException, Exception {
        List<FACSIMILFilter> lstRtn = new ArrayList<FACSIMILFilter>(0);
        FACSIMILFilter beanFacsimil;
        A720Filter beanCpn;
        List<A720Filter> lstRegA720 = new ArrayList<A720Filter>();
        HashMap hmValueA720 = new HashMap();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;
        String SQLCLL01 = "";
        SQLCLL01 = "{CALL PRAXIS.PXA730(?,?,?,?,?,?,?)}";
        
        Boolean noVTROLD = false;//!VTR.equals("VTR") && !VTR.equals("OLD");
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, TDNR.substring(0, 3));
            cstmt01.setString(3, TDNR.substring(3, 7));
            cstmt01.setString(4, TDNR.substring(7));
            cstmt01.setString(5, TCNR.substring(0, 3));
            cstmt01.setString(6, TCNR.substring(3, 7));
            cstmt01.setString(7, TCNR.substring(7));
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.A720REGIST = rst.getString("A730REGIST").trim();
                beanFacsimil.A720FREGIS = rst.getString("A730FREGIS").trim();
                beanFacsimil.A720REVISA = rst.getString("A730REVISA").trim();
                beanFacsimil.A720FREVIS = rst.getString("A730FREVIS").trim();
                beanFacsimil.A720GRUPO = rst.getString("A730GRUPO").trim();
                beanFacsimil.A720ORIG = rst.getString("A730ORIG").trim();
                beanFacsimil.A720FLAG = rst.getString("A730FLAG").trim();
                beanFacsimil.A720CTKTC = rst.getInt("A730CTKTC");
                beanFacsimil.A720PRO = rst.getString("A730PRO").trim();
                beanFacsimil.A720MONREG = rst.getString("A730MONREG").trim();
                beanFacsimil.A720FECVTA = rst.getString("A730FECVTA").trim();
                beanFacsimil.A720CIUVTA = rst.getString("A730CIUVTA").trim();
                beanFacsimil.A720PAIVTA = rst.getString("A730PAIVTA").trim();
                beanFacsimil.A720CIUEMI = rst.getString("A730CIUEMI").trim();
                beanFacsimil.A720PAIEMI = rst.getString("A730PAIEMI").trim();
                beanFacsimil.A720COMMIS = rst.getDouble("A730COMMIS");
                beanFacsimil.A720MDACOM = rst.getString("A730MDACOM").trim();
                beanFacsimil.A720PORCOM = rst.getDouble("A730PORCOM");
                beanFacsimil.A720CODIT = rst.getString("A730CODIT").trim();
                beanFacsimil.A720INITRA = rst.getString("A730INITRA").trim();
                beanFacsimil.A720TAJUST = rst.getDouble("A730TAJUST");
                beanFacsimil.A720TAJUSQ = rst.getDouble("A730TAJUSQ");
                beanFacsimil.A720TARIFA = rst.getDouble("A730TARIFA");
                beanFacsimil.A720TRFPAG = rst.getDouble("A730TRFPAG");
                beanFacsimil.A720TRFNUC = rst.getDouble("A730TRFNUC");
                beanFacsimil.A720ROE = rst.getDouble("A730ROE");
                beanFacsimil.A720CPLUSS = rst.getDouble("A730CPLUSS");
                beanFacsimil.A720CSOVER = rst.getDouble("A730CSOVER");
                beanFacsimil.A720QSOVER = rst.getInt("A730QSOVER");
                beanFacsimil.A720MONEDA = rst.getString("A730MONEDA").trim();
                beanFacsimil.A720MDAPAG = rst.getString("A730MDAPAG").trim();
                if (rst.getString("A1530STPRO").trim().equals("1")) {
                    beanFacsimil.A1530STPRO = "CLOSED";
                } else {
                    beanFacsimil.A1530STPRO = "OPEN";
                }
                beanFacsimil.strOthers = "User of Update : " + rst.getString("A1530USRAC").trim() 
                        + " / " + rst.getString("A1530FECAC").trim() + " / " + rst.getString("A1530HORAC").trim();
                beanFacsimil.A720STAT = rst.getString("A730STAT").trim();
                /*if (VTR.equals("VTR") || VTR.equals("OLD")) {
                    beanFacsimil.A1345FEXCH = "";
                    beanFacsimil.A1345CURR = "";
                    beanFacsimil.A1345FARE = 0.00;
                    beanFacsimil.A1345PGCUR = "";
                    beanFacsimil.A1345PAGO = 0.00;
                    beanFacsimil.A720STAT = rst.getString("A720STAT").trim() + "-VTR";
                } else {*/
                    beanFacsimil.A1345FEXCH = rst.getString("A730TRNCU").trim();
                    beanFacsimil.A1345CURR = rst.getString("A730MDAFA").trim();
                    beanFacsimil.A1345FARE = rst.getDouble("A730FARE");
                    beanFacsimil.A1345PGCUR = rst.getString("A730MDAAD").trim();
                    beanFacsimil.A1345PAGO = rst.getDouble("A730ADC");
                //}
                beanFacsimil.A1345NRPRT = "";//rst.getString("A1345NRPRT").trim();
                beanCpn = null;
                for (int i = 1; i < 5; i++) {
                    if (!rst.getString("A730RUTA" + i).trim().equals("")) {
                        beanCpn = new A720Filter();
                        //beanCpn.A720RUTAO = noVTROLD ? rst.getString("A730ORIGC" + i).trim() : rst.getString("A730RUTA" + (i -1)).trim();
                        //beanCpn.A720RUTAD = noVTROLD ? rst.getString("A730DESTC" + i).trim() : rst.getString("A730RUTA" + i).trim();
                        beanCpn.A720RUTAO = rst.getString("A730RUTA" + (i -1)).trim();
                        beanCpn.A720RUTAD = rst.getString("A730RUTA" + i).trim();
                        beanCpn.A720CONEX = rst.getString("A730CONEX" + i).trim();
                        beanCpn.A720CARRA = rst.getString("A730CARRA" + i).trim();
                        beanCpn.A720NVLO = rst.getString("A730NVLO" + i).trim();
                        beanCpn.A720FVLO = rst.getString("A730FVLO" + i).trim();
                        beanCpn.A720BOOKI = rst.getString("A730BOOKI" + i).trim();
                        beanCpn.A720CLASE = rst.getString("A730CLASE" + i).trim();
                        beanCpn.A720FBUSO = rst.getString("A730FBUSO" + i).trim();
                        beanCpn.A720FARE = rst.getDouble("A730FARE" + i);
                        beanCpn.A720TFARE = rst.getString("A730TFARE" + i).trim();
                        beanCpn.A720SS = rst.getDouble("A730SS" + i);
                        beanCpn.A720VLSRP = rst.getDouble("A730VLSRP" + i);
                        beanCpn.A720VLMPA = rst.getDouble("A730VLMPA" + i);
                        beanCpn.A720ACUE = rst.getDouble("A730ACUE" + i);
                        beanCpn.A720ISC = rst.getDouble("A730ISC" + i);
                        beanCpn.A720VALOR = rst.getDouble("A730VALOR" + i);
                        beanCpn.A720AJUST = rst.getDouble("A730AJUST" + i);
                        beanCpn.A720ACUEO = rst.getDouble("A730ACUEO" + i);
                        beanCpn.A720QIN = rst.getDouble("A730Q" + i);
                        beanCpn.A720YQ = rst.getDouble("A730YQ" + i);
                        beanCpn.A720FACT = rst.getDouble("A730FACT" + i);
                        beanCpn.A720PPRO = rst.getDouble("A730PPRO" + i);
                        beanCpn.A720PROV = rst.getDouble("A730PROV" + i);
                        beanCpn.A720PRRCM = rst.getDouble("A730PRRCM" + i);
                        beanCpn.A720PRSCM = rst.getDouble("A730PRSCM" + i);
                        beanCpn.A720INDPR = rst.getString("A730INDPR" + i);
                        //Temporal
                        beanCpn.A720LRRCM = rst.getDouble("A730PRRCM" + i);
                        beanCpn.A720LRSCM = rst.getDouble("A730PRSCM" + i);
                        
                        beanCpn.A720LYQ = rst.getDouble("A730LYQ" + i);
                        beanCpn.A720LIV = rst.getDouble("A730LIV" + i);

                        lstRegA720.add(beanCpn);
                        hmValueA720.put(rst.getString("A730CIA").trim() + rst.getString("A730FORMA").trim() + rst.getString("A730SERIE").trim() + i, rst.getDouble("A730VALOR" + i));
                    }
                }

                beanFacsimil.lstRegA720 = lstRegA720;
                beanFacsimil.A1526RATE = rst.getDouble("A730TCAMB");
                beanFacsimil.A720TCAMB = rst.getDouble("A730TCAMB");
                /*if (VTR.equals("VTR") || VTR.equals("OLD")) {
                    beanFacsimil.A720TRNCU = "";
                    beanFacsimil.A720TKVOID = "";
                } else {*/
                    beanFacsimil.A720TRNCU = rst.getString("A730TRNCU");
                    beanFacsimil.A720TKVOID = rst.getString("A730TKVOID");
                //}
                beanFacsimil.dblTarifa = 0.00;
                beanFacsimil.strMonTarifa = "";
                lstRtn.add(beanFacsimil);
            }
        }catch(Exception ex){
            String err = ex.getMessage();
            System.out.println(err);
        }finally {
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
        return lstRtn;
    }
    
    public S0007A720Filter verifyTKT(String TDNR) throws SQLException, Exception {
        CallableStatement cstmt = null;
        S0007A720Filter filter = new S0007A720Filter();
        String SQLCLL01 = "{CALL PXVerifyTKT(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.VARCHAR);

            cstmt.setString(1, "139");
            cstmt.setString(2, TDNR.substring(0, 3));
            cstmt.setString(3, TDNR.substring(3, 7));
            cstmt.setString(4, TDNR.substring(7));

            cstmt.execute();

            filter.dbException.SQLCODE = cstmt.getString(5);
            filter.dbException.MESSAGE = cstmt.getString(6);
        } catch (Exception e) {
            e.printStackTrace();
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
        return filter;
    }

    public List<FACSIMILFilter> searchA713(String TDNR, String Seq) throws SQLException, Exception {

        List<FACSIMILFilter> lstRtn = new ArrayList<FACSIMILFilter>(0);
        FACSIMILFilter beanFacsimil;
        A720 beanCpn;
        List<A720> lstRegA720 = new ArrayList<A720>();
        HashMap hmValueA720 = new HashMap();
        TDNR = Functions.fillZeros(13, TDNR);

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXA713(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, TDNR.substring(0, 3));
            cstmt01.setString(3, TDNR.substring(3, 7));
            cstmt01.setString(4, TDNR.substring(7));
            cstmt01.setString(5, Seq);
            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanFacsimil = new FACSIMILFilter();
                beanFacsimil.A720REGIST = rst.getString("A713REGIST").trim();
                beanFacsimil.A720FREGIS = rst.getString("A713FREGIS").trim();
                beanFacsimil.A720REVISA = rst.getString("A713REVISA").trim();
                beanFacsimil.A720FREVIS = rst.getString("A713FREVIS").trim();
                beanFacsimil.A720GRUPO = rst.getString("A713GRUPO").trim();
                beanFacsimil.A720ORIG = rst.getString("A713ORIG").trim();
                beanFacsimil.A720FLAG = rst.getString("A713FLAG").trim();
                beanFacsimil.A720CTKTC = rst.getInt("A713CTKTC");
                beanFacsimil.A720BASE = rst.getString("A713BASE").trim();
                beanFacsimil.A720PRO = rst.getString("A713PRO").trim();
                beanFacsimil.A720MONREG = rst.getString("A713MONREG").trim();
                beanFacsimil.A720MONSYS = rst.getString("A713MONSYS").trim();
                beanFacsimil.A720FECVTA = rst.getString("A713FECVTA").trim();
                beanFacsimil.A720CIUVTA = rst.getString("A713CIUVTA").trim();
                beanFacsimil.A720PAIVTA = rst.getString("A713PAIVTA").trim();
                beanFacsimil.A720CIUEMI = rst.getString("A713CIUEMI").trim();
                beanFacsimil.A720PAIEMI = rst.getString("A713PAIEMI").trim();
                beanFacsimil.A720COMMIS = rst.getDouble("A713COMMIS");
                beanFacsimil.A720MDACOM = rst.getString("A713MDACOM").trim();
                beanFacsimil.A720PORCOM = rst.getDouble("A713PORCOM");
                beanFacsimil.A720CODIT = rst.getString("A713CODIT").trim();
                beanFacsimil.A720INITRA = rst.getString("A713INITRA").trim();
                beanFacsimil.A720TAJUST = rst.getDouble("A713TAJUST");
                beanFacsimil.A720TAJUSQ = rst.getDouble("A713TAJUSQ");
                beanFacsimil.A720TARIFA = rst.getDouble("A713TARIFA");
                beanFacsimil.A720TRFPAG = rst.getDouble("A713TRFPAG");
                beanFacsimil.A720TRFNUC = rst.getDouble("A713TRFNUC");
                beanFacsimil.A720ROE = rst.getDouble("A713ROE");
                beanFacsimil.A720CPLUSS = rst.getDouble("A713CPLUSS");
                beanFacsimil.A720CSOVER = rst.getDouble("A713CSOVER");
                beanFacsimil.A720QSOVER = rst.getInt("A713QSOVER");
                beanFacsimil.A720MONEDA = rst.getString("A713MONEDA").trim();
                beanFacsimil.A720MDAPAG = rst.getString("A713MDAPAG").trim();

                beanFacsimil.A720STAT = rst.getString("A713STAT").trim();
                beanFacsimil.A1345FEXCH = rst.getString("A713TRNCU").trim();
                beanFacsimil.A1345NRPRT = "";//rst.getString("A1345NRPRT").trim();
                beanFacsimil.A1345CURR = rst.getString("A713MDAFA").trim();
                beanFacsimil.A1345FARE = rst.getDouble("A713FARE");
                beanFacsimil.A720MDAFA = rst.getString("A713MDAFA").trim();
                beanFacsimil.A720FARE = rst.getDouble("A713FARE");
                beanFacsimil.A720MDARV = rst.getString("A713MDARV").trim();
                beanFacsimil.A720FARERV = rst.getDouble("A713FARERV");

                beanFacsimil.A1345PGCUR = "";//rst.getString("A720MDAAD").trim();
                beanFacsimil.A1345PAGO = 0.00;//rst.getDouble("A720ADC");

                beanCpn = null;
                for (int i = 1; i < 5; i++) {
                    if (!rst.getString("A713RUTA" + i).trim().equals("")) {
                        beanCpn = new A720();//beanCpn = new A720Filter();
                        beanCpn.TKT = rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim();
                        beanCpn.CPNPR = i + "";
                        beanCpn.A720RUTAO = rst.getString("A713RUTA" + (i - 1)).trim();
                        beanCpn.A720RUTAD = rst.getString("A713RUTA" + i).trim();
                        beanCpn.A720CONEX = rst.getString("A713CONEX" + i).trim();
                        beanCpn.A720CARRA = rst.getString("A713CARRA" + i).trim();
                        beanCpn.A720NVLO = rst.getString("A713NVLO" + i).trim();
                        beanCpn.A720FVLO = rst.getString("A713FVLO" + i).trim();
                        beanCpn.A720BOOKI = rst.getString("A713BOOKI" + i).trim();
                        beanCpn.A720CLASE = rst.getString("A713CLASE" + i).trim();
                        beanCpn.A720FBUSO = rst.getString("A713FBUSO" + i).trim();
                        if (beanCpn.A720FBUSO.equals("")) {
                            beanCpn.A720FBUSO = rst.getString("A713FBORI" + i).trim();
                        }
                        beanCpn.A720TBASE = rst.getString("A713TBASE" + i).trim();
                        beanCpn.A720TDESC = rst.getString("A713TDESC" + i).trim();
                        beanCpn.A720PORDS = rst.getDouble("A713PORDS" + i);
                        beanCpn.A720FARE = rst.getDouble("A713FARE" + i);
                        beanCpn.A720TFARE = rst.getString("A713TFARE" + i).trim();
                        beanCpn.A720SS = rst.getDouble("A713SS" + i);
                        beanCpn.A720VLSRP = rst.getDouble("A713VLSRP" + i);
                        beanCpn.A720VLMPA = rst.getDouble("A713VLMPA" + i);
                        beanCpn.A720ACUE = rst.getDouble("A713ACUE" + i);
                        beanCpn.A720ISC = rst.getDouble("A713ISC" + i);
                        beanCpn.A720VALOR = rst.getDouble("A713VALOR" + i);
                        beanCpn.A720AJUST = rst.getDouble("A713AJUST" + i);
                        beanCpn.A720ACUEO = rst.getDouble("A713ACUEO" + i);
                        beanCpn.A720Q = rst.getDouble("A713Q" + i);
                        beanCpn.A720QIN = rst.getDouble("A713Q" + i);
                        beanCpn.A720YQ = rst.getDouble("A713YQ" + i);
                        beanCpn.A720FACT = rst.getDouble("A713FACT" + i);
                        beanCpn.A720YANQ = rst.getDouble("A713YANQ" + i);
                        beanCpn.A720PPRO = rst.getDouble("A713PPRO" + i);
                        beanCpn.A720PROV = rst.getDouble("A713PROV" + i);
                        beanCpn.A720PRRCM = rst.getDouble("A713PRRCM" + i);
                        beanCpn.A720TCAMB = rst.getDouble("A713TCAMB");
                        beanCpn.A720LOHO = rst.getString("A713LOHO" + i).trim();
                        beanCpn.A720VIA = rst.getString("A713VIA" + i).trim();
                        beanCpn.A720STBAS = rst.getString("A713STBAS" + i).trim();
                        beanCpn.A720DIFER = rst.getDouble("A713DIFER" + i);
                        beanCpn.A720FDIFE = rst.getString("A713FDIFE" + i).trim();
                        beanCpn.A720TRFM = rst.getDouble("A713TRFM" + i);
                        beanCpn.A720MNTFM = rst.getString("A713MNTFM" + i).trim();
                        beanCpn.A720IV = rst.getDouble("A713IV" + i);
                        lstRegA720.add(beanCpn);
                        hmValueA720.put(rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim() + i, rst.getDouble("A713VALOR" + i));
                    }
                }

                beanFacsimil.lstRegA713 = lstRegA720;
                beanFacsimil.A1526RATE = rst.getDouble("A713TCAMB");
                beanFacsimil.dblTarifa = 0.00;
                beanFacsimil.strMonTarifa = "";
                beanFacsimil.A720TKVOID = "";
                if (rst.getString("A713TDOC").trim().equals("VOID")) {
                    beanFacsimil.A720TKVOID = "V";
                }
                lstRtn.add(beanFacsimil);
            }

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

    public List<A1692Filter> loadSQP00293_Leg(String ccia, String forma, String serie, String cupon) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<A1692Filter>(0);
        A1692Filter beanTkt;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00293(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, ccia.trim());
            cstmt.setString(3, forma.trim());
            cstmt.setString(4, serie.trim());
            cstmt.setString(5, cupon.trim().replace(".0", ""));
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                beanTkt = new A1692Filter();
                beanTkt.CDEPART = rst.getString("ORIGEN");
                beanTkt.CARRIVA = rst.getString("DESTINO");
                beanTkt.CARR = rst.getString("CARRIER");
                beanTkt.CCIA = rst.getString("CIA");
                beanTkt.FORMA = rst.getString("FORMA");
                beanTkt.SERIE = rst.getString("SERIE");
                beanTkt.CUPON = rst.getString("CUPON");
                beanTkt.strTicket = rst.getString("CIA") + " " + rst.getString("FORMA") + rst.getString("SERIE");
                beanTkt.LEGSEQ = rst.getString("SUBLEG");
                beanTkt.NFLIGHT = rst.getString("NVLO");
                beanTkt.FBASE = rst.getString("FBASIS");
                beanTkt.CLAS = rst.getString("CLASE");
                beanTkt.RPK = rst.getString("RBD");
                beanTkt.MDACP = rst.getString("MDAREV");
                beanTkt.VCPN = rst.getDouble("VALQN");//Amount
                beanTkt.COMISI = rst.getDouble("VALCOMMN");//Comm
                beanTkt.ISC = rst.getDouble("VALOVRCOMN");//Over Comm
                beanTkt.A1692CREDTOTAL = rst.getDouble("VALYQN");//YQ

                lstCons.add(beanTkt);
            }

        } catch (Exception e) {
            //e.getMessage();
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

        return lstCons;
    }

    public List<A720> prorateoTicket(PRORATEFilter beanProrate) throws SQLException, Exception {
        Connection cnx = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A720> lstProrate = new ArrayList<A720>(0);
        A720 objRtn;
        try {
            session.getCNXIBMDB2().openSystem();
            ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
            try {
                App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/RUT01260.PGM";//RUT1050JD

                //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                AS400Map mapping = new AS400Map();
                //<editor-fold defaultstate="collapsed" desc="{...} 01 RECEIVING_DATA">
                AS400DataType[] RECEIVING_DATA = new AS400DataType[7];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_PROGRAM">
                AS400DataType[] LK_PROGRAM = new AS400DataType[1];
                LK_PROGRAM[0] = mapping.Char(10);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_BATCH">
                AS400DataType[] LK_BATCH = new AS400DataType[1];
                LK_BATCH[0] = mapping.Char(1);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_MOSTRAR_SCR">
                AS400DataType[] LK_MOSTRAR_SCR = new AS400DataType[1];
                LK_MOSTRAR_SCR[0] = mapping.Char(1);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_CREA_LOG">
                AS400DataType[] LK_CREA_LOG = new AS400DataType[1];
                LK_CREA_LOG[0] = mapping.Char(1);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 DATOS_INPUT">
                class IDX_DATOS_INPUT {

                    static final int LK_METODO = 0;
                    static final int LK_BASE_DOM = 1;
                    static final int LK_BASE_INT = 2;
                    static final int LK_TIPO_AJUSTE = 3;
                    static final int LK_CIALIT = 4;
                    static final int LK_CIA = 5;
                    static final int LK_FORMA = 6;
                    static final int LK_SERIE = 7;
                    static final int LK_CUPON = 8;
                    static final int LK_REGI_MDA = 9;
                    static final int LK_TUSO = 10;
                    static final int LK_FUSO = 11;
                    static final int LK_FVIAJE = 12;
                    static final int LK_FVENTA = 13;
                    static final int LK_TVENTA = 14;
                    static final int LK_FFACTU = 15;
                    static final int LK_FARE_MDA = 16;
                    static final int LK_FARE = 17;
                    static final int LK_EQV_MDA = 18;
                    static final int LK_EQV_FARE = 19;
                    static final int LK_EQV_TC = 20;
                    static final int LK_SAMPLING = 21;
                    static final int LK_NUC = 22;
                    static final int LK_NUC_MDA = 23;
                    static final int LK_ROE = 24;
                    static final int LK_IPLUS = 25;
                    static final int LK_TPLUS = 26;
                    static final int LK_QSTOPOVER = 27;
                    static final int LK_TSTOPOVER = 28;
                    static final int LK_EXCHANGE = 29;
                    static final int LK_CAMBIO_RUT = 30;
                    static final int LK_ORIGEN = 31;
                    static final int LO_SL = 32;
                    static final int LO_XO = 33;
                    static final int LO_M = 34;
                    static final int LO_AFTER = 35;
                    static final int LO_BEFOR = 36;
                    static final int LO_RUTING = 37;
                    static final int LO_AIRLONG = 38;
                    static final int LO_TRANSP = 39;
                    static final int LO_VIA = 40;
                    static final int LO_BASE = 41;
                    static final int LO_TBASE = 42;
                    static final int LO_SBTBASE = 43;
                    static final int LO_CLASE = 44;
                    static final int LO_RBD = 45;
                    static final int LO_TEMPOR = 46;
                    static final int LO_NVLO = 47;
                    static final int LO_FVLO = 48;
                    static final int LO_TDESC = 49;
                    static final int LO_PDESC = 50;
                    static final int LO_BREAK = 51;
                    static final int LO_INDST = 52;
                    static final int LO_PLUS = 53;
                    static final int LO_Q = 54;
                    static final int LO_DIFL = 55;
                    static final int LO_INDIF = 56;
                    static final int LO_ACU_MDA = 57;
                    static final int LO_ACU_I = 58;
                    static final int LO_TFM_MDA = 59;
                    static final int LO_TFM_I = 60;
                    static final int VALIDO_PARA_VIAJAR_INPUT = 61;
                }

                AS400DataType[] DATOS_INPUT = new AS400DataType[62];
                DATOS_INPUT[IDX_DATOS_INPUT.LK_METODO] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_BASE_DOM] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_BASE_INT] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TIPO_AJUSTE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CIALIT] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CIA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FORMA] = mapping.Char(4);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_SERIE] = mapping.Char(6);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CUPON] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_REGI_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TUSO] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FUSO] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FVIAJE] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FVENTA] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TVENTA] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FFACTU] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FARE_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FARE] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EQV_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EQV_FARE] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EQV_TC] = mapping.Numeric(7, 6, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_SAMPLING] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_NUC] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_NUC_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_ROE] = mapping.Numeric(7, 6, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_IPLUS] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TPLUS] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_QSTOPOVER] = mapping.Numeric(2, 0, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TSTOPOVER] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EXCHANGE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CAMBIO_RUT] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_ORIGEN] = mapping.Char(3);
                //DATOS_INPUT[IDX_DATOS_INPUT.LK_SELEC] = mapping.Char(8);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SL">
                AS400DataType[] LO_SL = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SELEC">
                class IDX_LK_SELEC {

                    static final int LK_SELEC = 0;
                }
                LO_SL[IDX_LK_SELEC.LK_SELEC] = mapping.Numeric(2, 0);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_SL] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SL)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_XO">
                AS400DataType[] LO_XO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_XO">
                class IDX_LK_XO {

                    static final int LK_XO = 0;
                }
                LO_XO[IDX_LK_XO.LK_XO] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_XO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_XO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_M">
                AS400DataType[] LO_M = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_M">
                class IDX_LK_M {

                    static final int LK_M = 0;
                }
                LO_M[IDX_LK_M.LK_M] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_M] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_M)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AFTER">
                AS400DataType[] LO_AFTER = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AFTER">
                class IDX_LK_AFTER {

                    static final int LK_AFTER = 0;
                }
                LO_AFTER[IDX_LK_AFTER.LK_AFTER] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_AFTER] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AFTER)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BEFOR">
                AS400DataType[] LO_BEFOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BEFOR">
                class IDX_LK_BEFOR {

                    static final int LK_BEFOR = 0;
                }
                LO_BEFOR[IDX_LK_BEFOR.LK_BEFOR] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_BEFOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BEFOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_RUTING">
                AS400DataType[] LO_RUTING = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_RUTING">
                class IDX_LK_RUTING {

                    static final int LK_RUTING = 0;
                }
                LO_RUTING[IDX_LK_RUTING.LK_RUTING] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_RUTING] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RUTING)), 41);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AIRLONG">
                AS400DataType[] LO_AIRLONG = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AIRLONG">
                class IDX_LK_AIRLONG {

                    static final int LK_AIRLONG = 0;
                }
                LO_AIRLONG[IDX_LK_AIRLONG.LK_AIRLONG] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_AIRLONG] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AIRLONG)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TRANSP">
                AS400DataType[] LO_TRANSP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TRANSP">
                class IDX_LK_TRANSP {

                    static final int LK_TRANSP = 0;
                }
                LO_TRANSP[IDX_LK_TRANSP.LK_TRANSP] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TRANSP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TRANSP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VIA">
                AS400DataType[] LO_VIA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VIA">
                class IDX_LK_VIA {

                    static final int LK_VIA = 0;
                }
                LO_VIA[IDX_LK_VIA.LK_VIA] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_VIA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VIA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BASE">
                AS400DataType[] LO_BASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BASE">
                class IDX_LK_BASE {

                    static final int LK_BASE = 0;
                }
                LO_BASE[IDX_LK_BASE.LK_BASE] = mapping.Char(15);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_BASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TBASE">
                AS400DataType[] LO_TBASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TBASE">
                class IDX_LK_TBASE {

                    static final int LK_TBASE = 0;
                }
                LO_TBASE[IDX_LK_TBASE.LK_TBASE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TBASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TBASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SBTBASE">
                AS400DataType[] LO_SBTBASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SBTBASE">
                class IDX_LK_SBTBASE {

                    static final int LK_SBTBASE = 0;
                }
                LO_SBTBASE[IDX_LK_SBTBASE.LK_SBTBASE] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_SBTBASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SBTBASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CLASE">
                AS400DataType[] LO_CLASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CLASE">
                class IDX_LK_CLASE {

                    static final int LK_CLASE = 0;
                }
                LO_CLASE[IDX_LK_CLASE.LK_CLASE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_CLASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CLASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_RBD">
                AS400DataType[] LO_RBD = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_RBD">
                class IDX_LK_RBD {

                    static final int LK_RBD = 0;
                }
                LO_RBD[IDX_LK_RBD.LK_RBD] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_RBD] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RBD)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TEMPOR">
                AS400DataType[] LO_TEMPOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TEMPOR">
                class IDX_LK_TEMPOR {

                    static final int LK_TEMPOR = 0;
                }
                LO_TEMPOR[IDX_LK_TEMPOR.LK_TEMPOR] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TEMPOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TEMPOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_NVLO">
                AS400DataType[] LO_NVLO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_NVLO">
                class IDX_LK_NVLO {

                    static final int LK_NVLO = 0;
                }
                LO_NVLO[IDX_LK_NVLO.LK_NVLO] = mapping.Char(5);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_NVLO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_NVLO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FVLO">
                AS400DataType[] LO_FVLO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FVLO">
                class IDX_LK_FVLO {

                    static final int LK_FVLO = 0;
                }
                LO_FVLO[IDX_LK_FVLO.LK_FVLO] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_FVLO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FVLO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TDESC">
                AS400DataType[] LO_TDESC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TDESC">
                class IDX_LK_TDESC {

                    static final int LK_TDESC = 0;
                }
                LO_TDESC[IDX_LK_TDESC.LK_TDESC] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TDESC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TDESC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PDESC">
                AS400DataType[] LO_PDESC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PDESC">
                class IDX_LK_PDESC {

                    static final int LK_PDESC = 0;
                }
                LO_PDESC[IDX_LK_PDESC.LK_PDESC] = mapping.Numeric(3, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_PDESC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PDESC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BREAK">
                AS400DataType[] LO_BREAK = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BREAK">
                class IDX_LK_BREAK {

                    static final int LK_BREAK = 0;
                }
                LO_BREAK[IDX_LK_BREAK.LK_BREAK] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_BREAK] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BREAK)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDST">
                AS400DataType[] LO_INDST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDST">
                class IDX_LK_INDST {

                    static final int LK_INDST = 0;
                }
                LO_INDST[IDX_LK_INDST.LK_INDST] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_INDST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PLUS">
                AS400DataType[] LO_PLUS = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PLUS">
                class IDX_LK_PLUS {

                    static final int LK_PLUS = 0;
                }
                LO_PLUS[IDX_LK_PLUS.LK_PLUS] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_PLUS] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PLUS)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q">
                AS400DataType[] LO_Q = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q">
                class IDX_LK_Q {

                    static final int LK_Q = 0;
                }
                LO_Q[IDX_LK_Q.LK_Q] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_Q] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_DIFL">
                AS400DataType[] LO_DIFL = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_DIFL">
                class IDX_LK_DIFL {

                    static final int LK_DIFL = 0;
                }
                LO_DIFL[IDX_LK_DIFL.LK_DIFL] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_DIFL] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_DIFL)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDIF">
                AS400DataType[] LO_INDIF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDIF">
                class IDX_LK_INDIF {

                    static final int LK_INDIF = 0;
                }
                LO_INDIF[IDX_LK_INDIF.LK_INDIF] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_INDIF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDIF)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_MDA">
                AS400DataType[] LO_ACU_MDA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_MDA">
                class IDX_LK_ACU_MDA {

                    static final int LK_ACU_MDA = 0;
                }
                LO_ACU_MDA[IDX_LK_ACU_MDA.LK_ACU_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_ACU_MDA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_MDA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_I">
                AS400DataType[] LO_ACU_I = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_I">
                class IDX_LK_ACU_I {

                    static final int LK_ACU_I = 0;
                }
                LO_ACU_I[IDX_LK_ACU_I.LK_ACU_I] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_ACU_I] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_I)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TFM_MDA">
                AS400DataType[] LO_TFM_MDA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TFM_MDA">
                class IDX_LK_TFM_MDA {

                    static final int LK_TFM_MDA = 0;
                }
                LO_TFM_MDA[IDX_LK_TFM_MDA.LK_TFM_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_MDA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TFM_MDA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TFM_I">
                AS400DataType[] LO_TFM_I = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TFM_I">
                class IDX_LK_TFM_I {

                    static final int LK_TFM_I = 0;
                }
                LO_TFM_I[IDX_LK_TFM_I.LK_TFM_I] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_I] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TFM_I)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 VALIDO_PARA_VIAJAR_INPUT">
                class IDX_VALIDO_PARA_VIAJAR_INPUT {

                    static final int LO_RUT_V = 0;
                    static final int LO_TRN_V = 1;
                    static final int LO_BAS_V = 2;
                    static final int LO_RBD_V = 3;
                    static final int LO_VLO_V = 4;
                    static final int LO_FVL_V = 5;
                }

                AS400DataType[] VALIDO_PARA_VIAJAR_INPUT = new AS400DataType[6];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_RUT_V">
                AS400DataType[] LO_RUT_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_RUT_V">
                class IDX_LK_RUT_V {

                    static final int LK_RUT_V = 0;
                }
                LO_RUT_V[IDX_LK_RUT_V.LK_RUT_V] = mapping.Char(3);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_RUT_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RUT_V)), 5);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_TRN_V">
                AS400DataType[] LO_TRN_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_TRN_V">
                class IDX_LK_TRN_V {

                    static final int LK_TRN_V = 0;
                }
                LO_TRN_V[IDX_LK_TRN_V.LK_TRN_V] = mapping.Char(2);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_TRN_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TRN_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_BAS_V">
                AS400DataType[] LO_BAS_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_BAS_V">
                class IDX_LK_BAS_V {

                    static final int LK_BAS_V = 0;
                }
                LO_BAS_V[IDX_LK_BAS_V.LK_BAS_V] = mapping.Char(15);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_BAS_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BAS_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_RBD_V">
                AS400DataType[] LO_RBD_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_RBD_V">
                class IDX_LK_RBD_V {

                    static final int LK_RBD_V = 0;
                }
                LO_RBD_V[IDX_LK_RBD_V.LK_RBD_V] = mapping.Char(1);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_RBD_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RBD_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_VLO_V">
                AS400DataType[] LO_VLO_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_VLO_V">
                class IDX_LK_VLO_V {

                    static final int LK_VLO_V = 0;
                }
                LO_VLO_V[IDX_LK_VLO_V.LK_VLO_V] = mapping.Char(5);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_VLO_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VLO_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_FVL_V">
                AS400DataType[] LO_FVL_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_FVL_V">
                class IDX_LK_FVL_V {

                    static final int LK_FVL_V = 0;
                }
                LO_FVL_V[IDX_LK_FVL_V.LK_FVL_V] = mapping.Char(8);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_FVL_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FVL_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 DATOS_OUPUT">
                class IDX_DATOS_OUPUT {

                    static final int LK_REGI_TC = 0;
                    static final int LK_SYST_MDA = 1;
                    static final int LK_SYST_TC = 2;
                    static final int LO_FACTOR = 3;
                    static final int LO_PROVIS = 4;
                    static final int LO_PPROVI = 5;
                    static final int LO_SUBPAR = 6;
                    static final int LO_TARIFA = 7;
                    static final int LO_YANQUI = 8;
                    static final int LO_ACU_O = 9;
                    static final int LO_ACU_CD = 10;
                    static final int LO_ACU_AUTO = 11;
                    static final int LO_ACU_APLICA = 12;
                    static final int LO_ACU_ERROR = 13;
                    static final int LO_INDISC = 14;
                    static final int LO_ISC = 15;
                    static final int LK_INDSRP = 16;
                    static final int LO_SRP = 17;
                    static final int LO_MPA = 18;
                    static final int LO_SOVER = 19;
                    static final int LO_FARE_ATBP = 20;
                    static final int LO_FARE_SYST = 21;
                    static final int LO_COEF = 22;
                    static final int LK_TVALOR_SYST = 23;
                    static final int LO_VALOR_SYST = 24;
                    static final int LK_TAJUSTE_SYST = 25;
                    static final int LO_AJUSTE_SYST = 26;
                    static final int LK_TVALOR = 27;
                    static final int LO_VALOR = 28;
                    static final int LO_INDPR = 29;
                    static final int LK_TAJUSTE = 30;
                    static final int LO_AJUSTE = 31;
                    static final int LK_ESTADO = 32;
                    static final int LK_CODERROR = 33;
                    static final int LK_MSJERROR = 34;
                    static final int LO_CODLOG = 35;
                    static final int LO_TXTLOG = 36;
                }

                AS400DataType[] DATOS_OUPUT = new AS400DataType[37];
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_REGI_TC] = mapping.Numeric(7, 6, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_SYST_MDA] = mapping.Char(3);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_SYST_TC] = mapping.Numeric(7, 6, true);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FACTOR">
                AS400DataType[] LO_FACTOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FACTOR">
                class IDX_LK_FACTOR {

                    static final int LK_FACTOR = 0;
                }
                LO_FACTOR[IDX_LK_FACTOR.LK_FACTOR] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FACTOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FACTOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PROVIS">
                AS400DataType[] LO_PROVIS = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PROVIS">
                class IDX_LK_PROVIS {

                    static final int LK_PROVIS = 0;
                }
                LO_PROVIS[IDX_LK_PROVIS.LK_PROVIS] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PROVIS] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PROVIS)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PPROVI">
                AS400DataType[] LO_PPROVI = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PPROVI">
                class IDX_LK_PPROVI {

                    static final int LK_PPROVI = 0;
                }
                LO_PPROVI[IDX_LK_PPROVI.LK_PPROVI] = mapping.Numeric(3, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PPROVI] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PPROVI)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SUBPAR">
                AS400DataType[] LO_SUBPAR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SUBPAR">
                class IDX_LK_SUBPAR {

                    static final int LK_SUBPAR = 0;
                }
                LO_SUBPAR[IDX_LK_SUBPAR.LK_SUBPAR] = mapping.Char(20);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SUBPAR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SUBPAR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TARIFA">
                AS400DataType[] LO_TARIFA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TARIFA">
                class IDX_LK_TARIFA {

                    static final int LK_TARIFA = 0;
                }
                LO_TARIFA[IDX_LK_TARIFA.LK_TARIFA] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_TARIFA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TARIFA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_YANQUI">
                AS400DataType[] LO_YANQUI = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_YANQUI">
                class IDX_LK_YANQUI {

                    static final int LK_YANQUI = 0;
                }
                LO_YANQUI[IDX_LK_YANQUI.LK_YANQUI] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_YANQUI] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_YANQUI)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_O">
                AS400DataType[] LO_ACU_O = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_O">
                class IDX_LK_ACU_O {

                    static final int LK_ACU_O = 0;
                }
                LO_ACU_O[IDX_LK_ACU_O.LK_ACU_O] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_O] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_O)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_CD">
                AS400DataType[] LO_ACU_CD = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_CD">
                class IDX_LK_ACU_CD {

                    static final int LK_ACU_CD = 0;
                }
                LO_ACU_CD[IDX_LK_ACU_CD.LK_ACU_CD] = mapping.Char(20);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_CD] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_CD)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_AUTO">
                AS400DataType[] LO_ACU_AUTO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_AUTO">
                class IDX_LK_ACU_AUTO {

                    static final int LK_ACU_AUTO = 0;
                }
                LO_ACU_AUTO[IDX_LK_ACU_AUTO.LK_ACU_AUTO] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_AUTO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_AUTO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_APLICA">
                AS400DataType[] LO_ACU_APLICA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_APLICA">
                class IDX_LK_ACU_APLICA {

                    static final int LK_ACU_APLICA = 0;
                }
                LO_ACU_APLICA[IDX_LK_ACU_APLICA.LK_ACU_APLICA] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_APLICA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_APLICA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_ERROR">
                AS400DataType[] LO_ACU_ERROR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_ERROR">
                class IDX_LK_ACU_ERROR {

                    static final int LK_ACU_ERROR = 0;
                }
                LO_ACU_ERROR[IDX_LK_ACU_ERROR.LK_ACU_ERROR] = mapping.Char(3);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_ERROR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_ERROR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDISC">
                AS400DataType[] LO_INDISC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDISC">
                class IDX_LK_INDISC {

                    static final int LK_INDISC = 0;
                }
                LO_INDISC[IDX_LK_INDISC.LK_INDISC] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_INDISC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDISC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ISC">
                AS400DataType[] LO_ISC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ISC">
                class IDX_LK_ISC {

                    static final int LK_ISC = 0;
                }
                LO_ISC[IDX_LK_ISC.LK_ISC] = mapping.Numeric(3, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ISC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ISC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SRP">
                AS400DataType[] LO_SRP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SRP">
                class IDX_LK_SRP {

                    static final int LK_SRP = 0;
                }
                LO_SRP[IDX_LK_SRP.LK_SRP] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SRP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SRP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_MPA">
                AS400DataType[] LO_MPA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_MPA">
                class IDX_LK_MPA {

                    static final int LK_MPA = 0;
                }
                LO_MPA[IDX_LK_MPA.LK_MPA] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_MPA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_MPA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SOVER">
                AS400DataType[] LO_SOVER = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SOVER">
                class IDX_LK_SOVER {

                    static final int LK_SOVER = 0;
                }
                LO_SOVER[IDX_LK_SOVER.LK_SOVER] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SOVER] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SOVER)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FARE_ATBP">
                AS400DataType[] LO_FARE_ATBP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FARE_ATBP">
                class IDX_LK_FARE_ATBP {

                    static final int LK_FARE_ATBP = 0;
                }
                LO_FARE_ATBP[IDX_LK_FARE_ATBP.LK_FARE_ATBP] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FARE_ATBP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FARE_ATBP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FARE_SYST">
                AS400DataType[] LO_FARE_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FARE_SYST">
                class IDX_LK_FARE_SYST {

                    static final int LK_FARE_SYST = 0;
                }
                LO_FARE_SYST[IDX_LK_FARE_SYST.LK_FARE_SYST] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FARE_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FARE_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF">
                AS400DataType[] LO_COEF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF">
                class IDX_LK_COEF {

                    static final int LK_COEF = 0;
                }
                LO_COEF[IDX_LK_COEF.LK_COEF] = mapping.Numeric(4, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_COEF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF)), 40);
                //</editor-fold>
                //LO_COEF[IDX_LK_COEF.LK_COEF] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VALOR_SYST">
                AS400DataType[] LO_VALOR_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VALOR_SYST">
                class IDX_LK_VALOR_SYST {

                    static final int LK_VALOR_SYST = 0;
                }
                LO_VALOR_SYST[IDX_LK_VALOR_SYST.LK_VALOR_SYST] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_VALOR_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VALOR_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AJUSTE_SYST">
                AS400DataType[] LO_AJUSTE_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AJUSTE_SYST">
                class IDX_LK_AJUSTE_SYST {

                    static final int LK_AJUSTE_SYST = 0;
                }
                LO_AJUSTE_SYST[IDX_LK_AJUSTE_SYST.LK_AJUSTE_SYST] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_AJUSTE_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AJUSTE_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VALOR">
                AS400DataType[] LO_VALOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VALOR">
                class IDX_LK_VALOR {

                    static final int LK_VALOR = 0;
                }
                LO_VALOR[IDX_LK_VALOR.LK_VALOR] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_VALOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VALOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDPR">
                AS400DataType[] LO_INDPR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDPR">
                class IDX_LK_INDPR {

                    static final int LK_INDPR = 0;
                }
                LO_INDPR[IDX_LK_INDPR.LK_INDPR] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_INDPR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDPR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AJUSTE">
                AS400DataType[] LO_AJUSTE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AJUSTE">
                class IDX_LK_AJUSTE {

                    static final int LK_AJUSTE = 0;
                }
                LO_AJUSTE[IDX_LK_AJUSTE.LK_AJUSTE] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_AJUSTE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AJUSTE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CODLOG">
                AS400DataType[] LO_CODLOG = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CODLOG">
                class IDX_LK_CODLOG {

                    static final int LK_CODLOG = 0;
                }
                LO_CODLOG[IDX_LK_CODLOG.LK_CODLOG] = mapping.Char(6);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_CODLOG] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CODLOG)), 200);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TXTLOG">
                AS400DataType[] LO_TXTLOG = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TXTLOG">
                class IDX_LK_TXTLOG {

                    static final int LK_TXTLOG = 0;
                }
                LO_TXTLOG[IDX_LK_TXTLOG.LK_TXTLOG] = mapping.Char(80);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_TXTLOG] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TXTLOG)), 200);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 DATOS_IO">
                class IDX_DATOS_IO {

                    static final int LK_AIRFACT = 0;
                    static final int LK_AIRFACTLT = 1;
                    static final int LK_AIRENDO = 2;
                    static final int LK_AIRENDOLT = 3;
                    static final int LK_MDA_ATBP = 4;
                    static final int LO_SUBPAR_CD = 5;
                    static final int LO_ACH = 6;
                    static final int LO_TRF = 7;
                    static final int LO_COEF_SRP = 8;
                    static final int LO_COEF_MPA = 9;
                    static final int LO_COEF_ACH = 10;
                    static final int LO_COEF_TRF = 11;
                    static final int LK_SECTOR_ORG = 12;
                    static final int LK_SECTOR_DST = 13;
                    static final int LO_ACU_BASE = 14;
                    static final int LK_ATBP_TC = 15;
                    static final int LO_Q_ATBP = 16;
                    static final int LO_Q_SYST = 17;
                    static final int LK_IT = 18;
                    static final int LK_CTYVTA = 19;
                    static final int LK_COUVTA = 20;
                    static final int LK_CTYEMI = 21;
                    static final int LK_COUEMI = 22;
                    static final int LK_FRMTYP = 23;
                    static final int LK_TKTTYP = 24;
                    static final int LO_FBTYP = 25;
                    static final int LO_FBUSE = 26;
                    static final int LO_SCMM = 27;
                    static final int LO_PRVPB = 28;
                    static final int LO_PRVPB_CUR = 29;
                    static final int LO_PRVPB_TC = 30;
                    static final int LO_ACUPB = 31;
                    static final int LO_ACUPB_CUR = 32;
                    static final int LO_ACUDSC = 33;
                    static final int LO_ACUFIM = 34;
                    static final int LO_BRKF_R006 = 35;
                    static final int LO_BRKQ_R006 = 36;
                    static final int LO_IGSA_R006 = 37;
                    static final int LO_GSA_R006 = 38;
                    static final int LO_ICARG_R006 = 39;
                    static final int LO_VCARG_R006 = 40;
                    static final int LO_MCARG_R006 = 41;
                    static final int LO_PCARG_R006 = 42;
                    static final int LO_CCARG_R006 = 43;
                    static final int LK_TIPO_PROC = 44;
                    static final int LO_BOLETO = 45;
                    static final int LO_CODPRT = 46;
                    static final int LO_Q_IN = 47;
                    static final int LO_Q_OUT = 48;
                    static final int LO_Q_MTH = 49;
                    static final int LO_Q_AJUS = 50;
                    static final int LK_TAJUSTE_Q = 51;
                    static final int LK_COMMIS = 52;
                    static final int LK_MDACOMM = 53;
                    static final int LO_PRRCOMM = 54;
                }

                AS400DataType[] DATOS_IO = new AS400DataType[55];
                DATOS_IO[IDX_DATOS_IO.LK_AIRFACT] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_AIRFACTLT] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_AIRENDO] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_AIRENDOLT] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_MDA_ATBP] = mapping.Char(3);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SUBPAR_CD">
                AS400DataType[] LO_SUBPAR_CD = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SUBPAR_CD">
                class IDX_LK_SUBPAR_CD {

                    static final int LK_SUBPAR_CD = 0;
                }
                LO_SUBPAR_CD[IDX_LK_SUBPAR_CD.LK_SUBPAR_CD] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_SUBPAR_CD] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SUBPAR_CD)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACH">
                AS400DataType[] LO_ACH = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACH">
                class IDX_LK_ACH {

                    static final int LK_ACH = 0;
                }
                LO_ACH[IDX_LK_ACH.LK_ACH] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_ACH] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACH)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TRF">
                AS400DataType[] LO_TRF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TRF">
                class IDX_LK_TRF {

                    static final int LK_TRF = 0;
                }
                LO_TRF[IDX_LK_TRF.LK_TRF] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_TRF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TRF)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_SRP">
                AS400DataType[] LO_COEF_SRP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_SRP">
                class IDX_LK_COEF_SRP {

                    static final int LK_COEF_SRP = 0;
                }
                LO_COEF_SRP[IDX_LK_COEF_SRP.LK_COEF_SRP] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_SRP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_SRP)), 40);
                //</editor-fold>
                //LO_COEF_SRP[IDX_LK_COEF_SRP.LK_COEF_SRP] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_MPA">
                AS400DataType[] LO_COEF_MPA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_MPA">
                class IDX_LK_COEF_MPA {

                    static final int LK_COEF_MPA = 0;
                }
                LO_COEF_MPA[IDX_LK_COEF_MPA.LK_COEF_MPA] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_MPA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_MPA)), 40);
                //</editor-fold>
                //LO_COEF_MPA[IDX_LK_COEF_MPA.LK_COEF_MPA] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_ACH">
                AS400DataType[] LO_COEF_ACH = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_ACH">
                class IDX_LK_COEF_ACH {

                    static final int LK_COEF_ACH = 0;
                }
                LO_COEF_ACH[IDX_LK_COEF_ACH.LK_COEF_ACH] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_ACH] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_ACH)), 40);
                //</editor-fold>
                //LO_COEF_ACH[IDX_LK_COEF_ACH.LK_COEF_ACH] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_TRF">
                AS400DataType[] LO_COEF_TRF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_TRF">
                class IDX_LK_COEF_TRF {

                    static final int LK_COEF_TRF = 0;
                }
                LO_COEF_TRF[IDX_LK_COEF_TRF.LK_COEF_TRF] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_TRF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_TRF)), 40);
                //</editor-fold>
                //LO_COEF_TRF[IDX_LK_COEF_TRF.LK_COEF_TRF] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_BASE">
                AS400DataType[] LO_ACU_BASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_BASE">
                class IDX_LK_ACU_BASE {

                    static final int LK_ACU_BASE = 0;
                }
                LO_ACU_BASE[IDX_LK_ACU_BASE.LK_ACU_BASE] = mapping.Char(4);
                DATOS_IO[IDX_DATOS_IO.LO_ACU_BASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_BASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_ATBP">
                AS400DataType[] LO_Q_ATBP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_ATBP">
                class IDX_LK_Q_ATBP {

                    static final int LK_Q_ATBP = 0;
                }
                LO_Q_ATBP[IDX_LK_Q_ATBP.LK_Q_ATBP] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_ATBP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_ATBP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_SYST">
                AS400DataType[] LO_Q_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_SYST">
                class IDX_LK_Q_SYST {

                    static final int LK_Q_SYST = 0;
                }
                LO_Q_SYST[IDX_LK_Q_SYST.LK_Q_SYST] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FBTYP">
                AS400DataType[] LO_FBTYP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FBTYP">
                class IDX_LK_FBTYP {

                    static final int LK_FBTYP = 0;
                }
                LO_FBTYP[IDX_LK_FBTYP.LK_FBTYP] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_FBTYP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FBTYP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FBUSE">
                AS400DataType[] LO_FBUSE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FBUSE">
                class IDX_LK_FBUSE {

                    static final int LK_FBUSE = 0;
                }
                LO_FBUSE[IDX_LK_FBUSE.LK_FBUSE] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_FBUSE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FBUSE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SCMM">
                AS400DataType[] LO_SCMM = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SCMM">
                class IDX_LK_SCMM {

                    static final int LK_SCMM = 0;
                }
                LO_SCMM[IDX_LK_SCMM.LK_SCMM] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_SCMM] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SCMM)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRVPB">
                AS400DataType[] LO_PRVPB = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRVPB">
                class IDX_LK_PRVPB {

                    static final int LK_PRVPB = 0;
                }
                LO_PRVPB[IDX_LK_PRVPB.LK_PRVPB] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_PRVPB] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRVPB)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRVPB_CUR">
                AS400DataType[] LO_PRVPB_CUR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRVPB_CUR">
                class IDX_LK_PRVPB_CUR {

                    static final int LK_PRVPB_CUR = 0;
                }
                LO_PRVPB_CUR[IDX_LK_PRVPB_CUR.LK_PRVPB_CUR] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_PRVPB_CUR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRVPB_CUR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRVPB_TC">
                AS400DataType[] LO_PRVPB_TC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRVPB_TC">
                class IDX_LK_PRVPB_TC {

                    static final int LK_PRVPB_TC = 0;
                }
                LO_PRVPB_TC[IDX_LK_PRVPB_TC.LK_PRVPB_TC] = mapping.Numeric(7, 5, true);
                DATOS_IO[IDX_DATOS_IO.LO_PRVPB_TC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRVPB_TC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUPB">
                AS400DataType[] LO_ACUPB = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUPB">
                class IDX_LK_ACUPB {

                    static final int LK_ACUPB = 0;
                }
                LO_ACUPB[IDX_LK_ACUPB.LK_ACUPB] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_ACUPB] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUPB)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUPB_CUR">
                AS400DataType[] LO_ACUPB_CUR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUPB_CUR">
                class IDX_LK_ACUPB_CUR {

                    static final int LK_ACUPB_CUR = 0;
                }
                LO_ACUPB_CUR[IDX_LK_ACUPB_CUR.LK_ACUPB_CUR] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_ACUPB_CUR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUPB_CUR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUDSC">
                AS400DataType[] LO_ACUDSC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUDSC">
                class IDX_LK_ACUDSC {

                    static final int LK_ACUDSC = 0;
                }
                LO_ACUDSC[IDX_LK_ACUDSC.LK_ACUDSC] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_ACUDSC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUDSC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUFIM">
                AS400DataType[] LO_ACUFIM = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUFIM">
                class IDX_LK_ACUFIM {

                    static final int LK_ACUFIM = 0;
                }
                LO_ACUFIM[IDX_LK_ACUFIM.LK_ACUFIM] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_ACUFIM] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUFIM)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BRKF_R006">
                AS400DataType[] LO_BRKF_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BRKF_R006">
                class IDX_LK_BRKF_R006 {

                    static final int LK_BRKF_R006 = 0;
                }
                LO_BRKF_R006[IDX_LK_BRKF_R006.LK_BRKF_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_BRKF_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BRKF_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BRKQ_R006">
                AS400DataType[] LO_BRKQ_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BRKQ_R006">
                class IDX_LK_BRKQ_R006 {

                    static final int LK_BRKQ_R006 = 0;
                }
                LO_BRKQ_R006[IDX_LK_BRKQ_R006.LK_BRKQ_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_BRKQ_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BRKQ_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_IGSA_R006">
                AS400DataType[] LO_IGSA_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_IGSA_R006">
                class IDX_LK_IGSA_R006 {

                    static final int LK_IGSA_R006 = 0;
                }
                LO_IGSA_R006[IDX_LK_IGSA_R006.LK_IGSA_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_IGSA_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_IGSA_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_GSA_R006">
                AS400DataType[] LO_GSA_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_GSA_R006">
                class IDX_LK_GSA_R006 {

                    static final int LK_GSA_R006 = 0;
                }
                LO_GSA_R006[IDX_LK_GSA_R006.LK_GSA_R006] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_GSA_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_GSA_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ICARG_R006">
                AS400DataType[] LO_ICARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ICARG_R006">
                class IDX_LK_ICARG_R006 {

                    static final int LK_ICARG_R006 = 0;
                }
                LO_ICARG_R006[IDX_LK_ICARG_R006.LK_ICARG_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_ICARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ICARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VCARG_R006">
                AS400DataType[] LO_VCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VCARG_R006">
                class IDX_LK_VCARG_R006 {

                    static final int LK_VCARG_R006 = 0;
                }
                LO_VCARG_R006[IDX_LK_VCARG_R006.LK_VCARG_R006] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_VCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_MCARG_R006">
                AS400DataType[] LO_MCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_MCARG_R006">
                class IDX_LK_MCARG_R006 {

                    static final int LK_MCARG_R006 = 0;
                }
                LO_MCARG_R006[IDX_LK_MCARG_R006.LK_MCARG_R006] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_MCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_MCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PCARG_R006">
                AS400DataType[] LO_PCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PCARG_R006">
                class IDX_LK_PCARG_R006 {

                    static final int LK_PCARG_R006 = 0;
                }
                LO_PCARG_R006[IDX_LK_PCARG_R006.LK_PCARG_R006] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_PCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CCARG_R006">
                AS400DataType[] LO_CCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CCARG_R006">
                class IDX_LK_CCARG_R006 {

                    static final int LK_CCARG_R006 = 0;
                }
                LO_CCARG_R006[IDX_LK_CCARG_R006.LK_CCARG_R006] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_CCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BOLETO">
                AS400DataType[] LO_BOLETO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BOLETO">
                class IDX_LK_BOLETO {

                    static final int LK_BOLETO = 0;
                }
                LO_BOLETO[IDX_LK_BOLETO.LK_BOLETO] = mapping.Char(14);
                DATOS_IO[IDX_DATOS_IO.LO_BOLETO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BOLETO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CODPRT">
                AS400DataType[] LO_CODPRT = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CODPRT">
                class IDX_LK_CODPRT {

                    static final int LK_CODPRT = 0;
                }
                LO_CODPRT[IDX_LK_CODPRT.LK_CODPRT] = mapping.Char(6);
                DATOS_IO[IDX_DATOS_IO.LO_CODPRT] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CODPRT)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_IN">
                AS400DataType[] LO_Q_IN = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_IN">
                class IDX_LK_Q_IN {

                    static final int LK_Q_IN = 0;
                }
                LO_Q_IN[IDX_LK_Q_IN.LK_Q_IN] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_IN] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_IN)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_OUT">
                AS400DataType[] LO_Q_OUT = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_OUT">
                class IDX_LK_Q_OUT {

                    static final int LK_Q_OUT = 0;
                }
                LO_Q_OUT[IDX_LK_Q_OUT.LK_Q_OUT] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_OUT] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_OUT)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_MTH">
                AS400DataType[] LO_Q_MTH = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_MTH">
                class IDX_LK_Q_MTH {

                    static final int LK_Q_MTH = 0;
                }
                LO_Q_MTH[IDX_LK_Q_MTH.LK_Q_MTH] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_Q_MTH] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_MTH)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_AJUS">
                AS400DataType[] LO_Q_AJUS = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_AJUS">
                class IDX_LK_Q_AJUS {

                    static final int LK_Q_AJUS = 0;
                }
                LO_Q_AJUS[IDX_LK_Q_AJUS.LK_Q_AJUS] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_AJUS] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_AJUS)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRRCOMM">
                AS400DataType[] LO_PRRCOMM = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRRCOMM">
                class IDX_LK_PRRCOMM {

                    static final int LK_PRRCOMM = 0;
                }
                LO_PRRCOMM[IDX_LK_PRRCOMM.LK_PRRCOMM] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_PRRCOMM] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRRCOMM)), 40);
                //</editor-fold>

                //DATOS_INPUT: Faltantes
                DATOS_INPUT[IDX_DATOS_INPUT.VALIDO_PARA_VIAJAR_INPUT] = mapping.Char(mapping.GetDimension(VALIDO_PARA_VIAJAR_INPUT));//mapping.Char(139);

                //DATOS_OUTPUT: Faltantes
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_INDSRP] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TVALOR_SYST] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TAJUSTE_SYST] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TVALOR] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TAJUSTE] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_CODERROR] = mapping.Char(6);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_MSJERROR] = mapping.Char(80);

                //DATOS_IO: Faltantes
                DATOS_IO[IDX_DATOS_IO.LK_SECTOR_ORG] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_SECTOR_DST] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_ATBP_TC] = mapping.Numeric(7, 6, true);
                DATOS_IO[IDX_DATOS_IO.LK_IT] = mapping.Char(20);
                DATOS_IO[IDX_DATOS_IO.LK_CTYVTA] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_COUVTA] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_CTYEMI] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_COUEMI] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_FRMTYP] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_TKTTYP] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_TIPO_PROC] = mapping.Char(4);
                DATOS_IO[IDX_DATOS_IO.LK_TAJUSTE_Q] = mapping.Numeric(11, 2, true);
                DATOS_IO[IDX_DATOS_IO.LK_COMMIS] = mapping.Numeric(11, 2, true);
                DATOS_IO[IDX_DATOS_IO.LK_MDACOMM] = mapping.Char(3);

                RECEIVING_DATA[0] = mapping.Char(mapping.GetDimension(LK_PROGRAM));
                RECEIVING_DATA[1] = mapping.Char(mapping.GetDimension(LK_BATCH));
                RECEIVING_DATA[2] = mapping.Char(mapping.GetDimension(LK_MOSTRAR_SCR));
                RECEIVING_DATA[3] = mapping.Char(mapping.GetDimension(LK_CREA_LOG));
                RECEIVING_DATA[4] = mapping.Char(mapping.GetDimension(DATOS_INPUT));
                RECEIVING_DATA[5] = mapping.Char(mapping.GetDimension(DATOS_OUPUT));
                RECEIVING_DATA[6] = mapping.Char(mapping.GetDimension(DATOS_IO));
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="{...} Structure">
                AS400Structure structure = new AS400Structure(RECEIVING_DATA);

                int dim = mapping.GetDimension(LK_PROGRAM)
                        + mapping.GetDimension(LK_BATCH)
                        + mapping.GetDimension(LK_MOSTRAR_SCR)
                        + mapping.GetDimension(LK_CREA_LOG)
                        + mapping.GetDimension(DATOS_INPUT)
                        + mapping.GetDimension(DATOS_OUPUT)
                        + mapping.GetDimension(DATOS_IO) + 1;

                AS400Structure structure01 = new AS400Structure(LK_PROGRAM);
                AS400Structure structure02 = new AS400Structure(LK_BATCH);
                AS400Structure structure03 = new AS400Structure(LK_MOSTRAR_SCR);
                AS400Structure structure04 = new AS400Structure(LK_CREA_LOG);
                AS400Structure structure05 = new AS400Structure(DATOS_INPUT);
                AS400Structure structure06 = new AS400Structure(DATOS_OUPUT);
                AS400Structure structure07 = new AS400Structure(DATOS_IO);

                AS400Structure structure08 = new AS400Structure(LO_RUTING);
                AS400Structure structure09 = new AS400Structure(LO_BOLETO);
                AS400Structure structure10 = new AS400Structure(LO_XO);
                AS400Structure structure11 = new AS400Structure(LO_TRANSP);
                AS400Structure structure12 = new AS400Structure(LO_NVLO);
                AS400Structure structure13 = new AS400Structure(LO_FVLO);
                AS400Structure structure14 = new AS400Structure(LO_RBD);
                AS400Structure structure15 = new AS400Structure(LO_CLASE);
                AS400Structure structure16 = new AS400Structure(LO_BASE);
                AS400Structure structure17 = new AS400Structure(LO_TBASE);
                AS400Structure structure18 = new AS400Structure(LO_SBTBASE);
                AS400Structure structure19 = new AS400Structure(LO_TDESC);
                AS400Structure structure20 = new AS400Structure(LO_PDESC);
                AS400Structure structure21 = new AS400Structure(LO_BREAK);
                AS400Structure structure22 = new AS400Structure(LO_INDST);
                AS400Structure structure23 = new AS400Structure(LO_Q);
                AS400Structure structure24 = new AS400Structure(LO_SRP);
                AS400Structure structure25 = new AS400Structure(LO_MPA);
                AS400Structure structure26 = new AS400Structure(LO_ACU_O);
                AS400Structure structure27 = new AS400Structure(LO_ACU_CD);
                AS400Structure structure28 = new AS400Structure(LO_ISC);
                AS400Structure structure29 = new AS400Structure(LO_VALOR);
                AS400Structure structure30 = new AS400Structure(LO_AJUSTE);
                AS400Structure structure31 = new AS400Structure(LO_Q_OUT);
                AS400Structure structure32 = new AS400Structure(LO_FACTOR);
                AS400Structure structure33 = new AS400Structure(LO_PPROVI);
                AS400Structure structure34 = new AS400Structure(LO_PROVIS);
                AS400Structure structure35 = new AS400Structure(LO_PRRCOMM);
                AS400Structure structure36 = new AS400Structure(LO_INDPR);
                AS400Structure structure37 = new AS400Structure(LO_TXTLOG);
                AS400Structure structure38 = new AS400Structure(LO_VIA);
                AS400Structure structure39 = new AS400Structure(LO_DIFL);
                AS400Structure structure40 = new AS400Structure(LO_INDIF);
                AS400Structure structure41 = new AS400Structure(LO_TFM_I);
                AS400Structure structure42 = new AS400Structure(LO_TFM_MDA);
                AS400Structure structure43 = new AS400Structure(LO_ACU_I);
                AS400Structure structure44 = new AS400Structure(LO_Q_IN);
                AS400Structure structure45 = new AS400Structure(LO_YANQUI);
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="{...} Calcular CiaLit">
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                String CiaLit = "";
                String IssuedBy = "";
                strSQL = "SELECT A005KEY1, A005KEY2 FROM " + session.getMainLibrary() + ".A005 WHERE A005KEY = '" + beanProrate.LK_CIA + "'";
                stmt = cnx.prepareStatement(strSQL);
                stmt.execute();
                rst = stmt.getResultSet();
                if (rst.next()) {
                    IssuedBy = rst.getString("A005KEY2").trim();
                    CiaLit = rst.getString("A005KEY1").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                rst = null;
                //</editor-fold>

                ProgramParameter[] parameterList = new ProgramParameter[2];
                /*StringBuffer sb = new StringBuffer(39991);
                for ( int i=0;i < 39991;i++) {
                    sb.append("0");
                }*/
                //<editor-fold defaultstate="collapsed" desc="{...} Trama">
                String trama = "";
                trama = "RUT1050WEBSNN"
                        + StringUtils.rightPad(beanProrate.LK_METODO, 3)
                        + StringUtils.rightPad(beanProrate.LK_BASE_DOM, 1)
                        + StringUtils.rightPad(beanProrate.LK_BASE_INT, 1)
                        + StringUtils.rightPad(beanProrate.LK_TIPO_AJUSTE, 1)
                        + StringUtils.rightPad(CiaLit, 3)
                        + StringUtils.rightPad(beanProrate.LK_CIA, 3)
                        + StringUtils.rightPad(beanProrate.LK_FORMA, 4)
                        + StringUtils.rightPad(beanProrate.LK_SERIE, 6)
                        + StringUtils.rightPad(beanProrate.LK_CUPON, 1)
                        + StringUtils.rightPad(beanProrate.LK_REGI_MDA, 3)
                        + StringUtils.rightPad(beanProrate.LK_TUSO, 2)
                        + StringUtils.rightPad(beanProrate.LK_FUSO, 8)
                        + StringUtils.rightPad(beanProrate.LK_FVIAJE, 8)
                        + StringUtils.rightPad(beanProrate.LK_FVENTA, 8)
                        + StringUtils.rightPad(beanProrate.LK_TVENTA, 1)
                        + StringUtils.rightPad(beanProrate.LK_FFACTU, 8)
                        + StringUtils.rightPad(beanProrate.LK_FARE_MDA, 3)
                        + beanProrate.LK_FARE
                        + StringUtils.rightPad(beanProrate.LK_EQV_MDA, 3)
                        + beanProrate.LK_EQV_FARE
                        + beanProrate.LK_EQV_TC
                        + StringUtils.rightPad(beanProrate.LK_SAMPLIG, 1)
                        + beanProrate.LK_NUC
                        + StringUtils.rightPad(beanProrate.LK_NUC_MDA, 3)
                        + beanProrate.LK_ROE
                        + StringUtils.rightPad(beanProrate.LK_IPLUS, 1)
                        + beanProrate.LK_TPLUS
                        + beanProrate.LK_QSTOPOVER
                        + beanProrate.LK_TSTOPOVER
                        + StringUtils.rightPad(beanProrate.LK_EXCHANGE, 1)
                        + StringUtils.rightPad(beanProrate.LK_CAMBIO_RUT, 1)
                        + StringUtils.rightPad(beanProrate.LK_ORIGEN, 3)
                        + beanProrate.LO_SL
                        + StringUtils.rightPad(beanProrate.LO_XO, 40)
                        + StringUtils.rightPad(beanProrate.LO_M, 40)
                        + StringUtils.rightPad(beanProrate.LO_AFTER, 320)
                        + StringUtils.rightPad(beanProrate.LO_BEFOR, 320)
                        + StringUtils.rightPad(beanProrate.LO_RUTING, 123)
                        + StringUtils.rightPad(beanProrate.LO_AIRLONG, 120)
                        + StringUtils.rightPad(beanProrate.LO_TRANSP, 80)
                        + StringUtils.rightPad(beanProrate.LO_VIA, 80)
                        + StringUtils.rightPad(beanProrate.LO_BASE, 600)
                        + StringUtils.rightPad(beanProrate.LO_TBASE, 40)
                        + StringUtils.rightPad(beanProrate.LO_SBTBASE, 80)
                        + StringUtils.rightPad(beanProrate.LO_CLASE, 40)
                        + StringUtils.rightPad(beanProrate.LO_RBD, 40)
                        + StringUtils.rightPad(beanProrate.LO_TEMPOR, 40)
                        + StringUtils.rightPad(beanProrate.LO_NVLO, 200)
                        + StringUtils.rightPad(beanProrate.LO_FVLO, 320)
                        + StringUtils.rightPad(beanProrate.LO_TDESC, 80)
                        + Util.fillZeros2(200, beanProrate.LO_PDESC)
                        + Util.fillZeros2(400, beanProrate.LO_BREAK)
                        + StringUtils.rightPad(beanProrate.LO_INDST, 40)
                        + Util.fillZeros2(400, beanProrate.LO_PLUS)
                        + Util.fillZeros2(400, beanProrate.LO_Q)
                        + Util.fillZeros2(400, beanProrate.LO_DIFL)
                        + StringUtils.rightPad(beanProrate.LO_INDIF, 40)
                        + StringUtils.rightPad(beanProrate.LO_ACU_MDA, 120)
                        + Util.fillZeros2(400, beanProrate.LO_ACU_I)
                        + StringUtils.rightPad(beanProrate.LO_TFM_MDA, 120)
                        + Util.fillZeros2(400, beanProrate.LO_TFM_I)
                        + StringUtils.rightPad(beanProrate.LO_RUT_V, 15)
                        + StringUtils.rightPad(beanProrate.LO_TRN_V, 8)
                        + StringUtils.rightPad(beanProrate.LO_BAS_V, 60)
                        + StringUtils.rightPad(beanProrate.LO_RBD_V, 4)
                        + StringUtils.rightPad(beanProrate.LO_VLO_V, 20)
                        + StringUtils.rightPad(beanProrate.LO_FVL_V, 32)
                        + beanProrate.LK_REGI_TC
                        + StringUtils.rightPad(beanProrate.LK_SYST_MDA, 3)
                        + StringUtils.rightPad(beanProrate.LK_SYST_TC, 13)
                        + Util.fillZeros2(400, beanProrate.LO_FACTOR)
                        + Util.fillZeros2(400, beanProrate.LO_PROVIS)
                        + Util.fillZeros2(200, beanProrate.LO_PPROVI)
                        + StringUtils.rightPad(beanProrate.LO_SUBPAR, 800)
                        + Util.fillZeros2(400, beanProrate.LO_TARIFA)
                        + Util.fillZeros2(400, beanProrate.LO_YANQUI)
                        + Util.fillZeros2(400, beanProrate.LO_ACU_O)
                        + StringUtils.rightPad(beanProrate.LO_ACU_CD, 800)
                        + StringUtils.rightPad(beanProrate.LO_ACU_AUTO, 40)
                        + StringUtils.rightPad(beanProrate.LO_ACU_APLICA, 40)
                        + StringUtils.rightPad(beanProrate.LO_ACU_ERROR, 120)
                        + StringUtils.rightPad(beanProrate.LO_INDISC, 40)
                        + Util.fillZeros2(200, beanProrate.LO_ISC)
                        + StringUtils.rightPad(beanProrate.LK_INDSRP, 1)
                        + Util.fillZeros2(400, beanProrate.LO_SRP)
                        + Util.fillZeros2(400, beanProrate.LO_MPA)
                        + Util.fillZeros2(400, beanProrate.LO_SOVER)
                        + Util.fillZeros2(400, beanProrate.LO_FARE_ATBP)
                        + Util.fillZeros2(400, beanProrate.LO_FARE_SYST)
                        + Util.fillZeros2(240, beanProrate.LO_COEF)
                        + beanProrate.LK_TVALOR_SYST
                        + Util.fillZeros2(400, beanProrate.LO_VALOR_SYST)
                        + beanProrate.LK_TAJUSTE_SYST
                        + Util.fillZeros2(400, beanProrate.LO_AJUSTE_SYST)
                        + beanProrate.LK_TVALOR
                        + Util.fillZeros2(400, beanProrate.LO_VALOR)
                        + StringUtils.rightPad(beanProrate.LO_INDPR, 40)
                        + beanProrate.LK_TAJUSTE
                        + Util.fillZeros2(400, beanProrate.LO_AJUSTE)
                        + StringUtils.rightPad(beanProrate.LK_ESTADO, 1)
                        + StringUtils.rightPad(beanProrate.LK_CODERROR, 6)
                        + StringUtils.rightPad(beanProrate.LK_MSJERROR, 80)
                        + StringUtils.rightPad(beanProrate.LO_CODLOG, 1200)
                        + StringUtils.rightPad(beanProrate.LO_TXTLOG, 16000)
                        + StringUtils.rightPad(beanProrate.LK_AIRFACT, 3)
                        + StringUtils.rightPad(beanProrate.LK_AIRFACTLT, 2)
                        + StringUtils.rightPad(beanProrate.LK_AIRENDO, 3)
                        + StringUtils.rightPad(beanProrate.LK_AIRENDOLT, 2)
                        + StringUtils.rightPad(beanProrate.LK_MDA_ATBP, 3)
                        + StringUtils.rightPad(beanProrate.LO_SUBPAR_CD, 80)
                        + Util.fillZeros2(400, beanProrate.LO_ACH)
                        + Util.fillZeros2(400, beanProrate.LO_TRF)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_SRP)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_MPA)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_ACH)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_TRF)
                        + StringUtils.rightPad(beanProrate.LK_SECTOR_ORG, 3)
                        + StringUtils.rightPad(beanProrate.LK_SECTOR_DST, 3)
                        + StringUtils.rightPad(beanProrate.LO_ACU_BASE, 160)
                        + beanProrate.LK_ATBP_TC
                        + Util.fillZeros2(400, beanProrate.LO_Q_ATBP)
                        + Util.fillZeros2(400, beanProrate.LO_Q_SYST)
                        + StringUtils.rightPad(beanProrate.LK_IT, 20)
                        + StringUtils.rightPad(beanProrate.LK_CTYVTA, 3)
                        + StringUtils.rightPad(beanProrate.LK_COUVTA, 2)
                        + StringUtils.rightPad(beanProrate.LK_CTYEMI, 3)
                        + StringUtils.rightPad(beanProrate.LK_COUEMI, 2)
                        + StringUtils.rightPad(beanProrate.LK_FRMTYP, 3)
                        + StringUtils.rightPad(beanProrate.LK_TKTTYP, 3)
                        + StringUtils.rightPad(beanProrate.LO_FBTYP, 80)
                        + StringUtils.rightPad(beanProrate.LO_FBUSE, 80)
                        + Util.fillZeros2(200, beanProrate.LO_SCMM)
                        + Util.fillZeros2(400, beanProrate.LO_PRVPB)
                        + StringUtils.rightPad(beanProrate.LO_PRVPB_CUR, 120)
                        + Util.fillZeros2(480, beanProrate.LO_PRVPB_TC)
                        + Util.fillZeros2(400, beanProrate.LO_ACUPB)
                        + StringUtils.rightPad(beanProrate.LO_ACUPB_CUR, 120)
                        + Util.fillZeros2(200, beanProrate.LO_ACUDSC)
                        + StringUtils.rightPad(beanProrate.LO_ACUFIM, 40)
                        + StringUtils.rightPad(beanProrate.LO_BRKF_R006, 40)
                        + StringUtils.rightPad(beanProrate.LO_BRKQ_R006, 40)
                        + StringUtils.rightPad(beanProrate.LO_IGSA_R006, 40)
                        + Util.fillZeros2(200, beanProrate.LO_GSA_R006)
                        + StringUtils.rightPad(beanProrate.LO_ICARG_R006, 40)
                        + Util.fillZeros2(400, beanProrate.LO_VCARG_R006)
                        + StringUtils.rightPad(beanProrate.LO_MCARG_R006, 120)
                        + Util.fillZeros2(200, beanProrate.LO_PCARG_R006)
                        + StringUtils.rightPad(beanProrate.LO_CCARG_R006, 80)
                        + StringUtils.rightPad(beanProrate.LK_TIPO_PROC, 4)
                        + StringUtils.rightPad(beanProrate.LO_BOLETO, 560)
                        + StringUtils.rightPad(beanProrate.LO_CODPRT, 240)
                        + Util.fillZeros2(400, beanProrate.LK_Q_IN)
                        + Util.fillZeros2(400, beanProrate.LK_Q_OUT)
                        + StringUtils.rightPad(beanProrate.LK_Q_MTH, 120)
                        + Util.fillZeros2(400, beanProrate.LK_Q_AJUS)
                        + beanProrate.LK_TAJUST_Q
                        + beanProrate.LK_COMMIS
                        + StringUtils.rightPad(beanProrate.LK_MDACOMM, 3)
                        + Util.fillZeros2(400, beanProrate.LK_PRRCOMM) + " ";
                //</editor-fold>

                parameterList[0] = new ProgramParameter(mapping.Char(dim).toBytes(trama));
                parameterList[1] = new ProgramParameter(dim);

                program.setProgram(programName, parameterList);

                if (program.run() != true) {
                    System.out.println("Program failed!");
                    AS400Message[] messagelist = program.getMessageList();
                    for (int i = 0; i < messagelist.length; ++i) {
                        //System.out.println(messagelist[i]);
                        objRtn = new A720();
                        objRtn.LK_ESTADO = "1";
                        objRtn.LK_CODERROR = "RUT1050";
                        objRtn.LK_MSJERROR = messagelist[i].toString();
                        lstProrate.add(objRtn);
                    }
                } else {
                    byte[] receiverVar = parameterList[1].getOutputData();

                    //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                    Object[] N01_RECEIVING_DATA = (Object[]) structure.toObject(receiverVar, 0);
                    String N02_LK_PROGRAM = (String) ((Object[]) structure01.toObject(RECEIVING_DATA[0].toBytes(N01_RECEIVING_DATA[0]), 0))[0];
                    String N02_LK_BATCH = (String) ((Object[]) structure02.toObject(RECEIVING_DATA[1].toBytes(N01_RECEIVING_DATA[1]), 0))[0];
                    String N02_LK_MOSTRAR_SCR = (String) ((Object[]) structure03.toObject(RECEIVING_DATA[2].toBytes(N01_RECEIVING_DATA[2]), 0))[0];
                    String N02_LK_CREA_LOG = (String) ((Object[]) structure04.toObject(RECEIVING_DATA[3].toBytes(N01_RECEIVING_DATA[3]), 0))[0];
                    Object[] N02_DATOS_INPUT = (Object[]) structure05.toObject(RECEIVING_DATA[4].toBytes(N01_RECEIVING_DATA[4]), 0);
                    Object[] N02_DATOS_OUPUT = (Object[]) structure06.toObject(RECEIVING_DATA[5].toBytes(N01_RECEIVING_DATA[5]), 0);
                    Object[] N02_DATOS_IO = (Object[]) structure07.toObject(RECEIVING_DATA[6].toBytes(N01_RECEIVING_DATA[6]), 0);

                    Object[] N03_LO_TRANSP = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TRANSP]);
                    List<Object[]> N04_LO_TRANSP = new ArrayList<Object[]>(N03_LO_TRANSP.length);
                    for (int i = 0; i < N03_LO_TRANSP.length; i++) {
                        N04_LO_TRANSP.add((Object[]) structure11.toObject(mapping.Char(mapping.GetDimension(LO_TRANSP)).toBytes(N03_LO_TRANSP[i]), 0));
                        if ((N03_LO_TRANSP[i]).toString().trim().equals("")) {
                            i = N03_LO_TRANSP.length + 1;
                        }
                    }
                    Object[] N03_LO_RUTING = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_RUTING]);
                    List<Object[]> N04_LO_RUTING = new ArrayList<Object[]>(N03_LO_RUTING.length);
                    for (int i = 0; i < N04_LO_TRANSP.size() + 1; i++) {
                        N04_LO_RUTING.add((Object[]) structure08.toObject(mapping.Char(mapping.GetDimension(LO_RUTING)).toBytes(N03_LO_RUTING[i]), 0));
                    }
                    Object[] N03_LO_BOLETO = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_BOLETO]);
                    List<Object[]> N04_LO_BOLETO = new ArrayList<Object[]>(N03_LO_BOLETO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_BOLETO.add((Object[]) structure09.toObject(mapping.Char(mapping.GetDimension(LO_BOLETO)).toBytes(N03_LO_BOLETO[i]), 0));
                    }
                    Object[] N03_LO_XO = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_XO]);
                    List<Object[]> N04_LO_XO = new ArrayList<Object[]>(N03_LO_XO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_XO.add((Object[]) structure10.toObject(mapping.Char(mapping.GetDimension(LO_XO)).toBytes(N03_LO_XO[i]), 0));
                    }
                    Object[] N03_LO_NVLO = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_NVLO]);
                    List<Object[]> N04_LO_NVLO = new ArrayList<Object[]>(N03_LO_NVLO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_NVLO.add((Object[]) structure12.toObject(mapping.Char(mapping.GetDimension(LO_NVLO)).toBytes(N03_LO_NVLO[i]), 0));
                    }
                    Object[] N03_LO_FVLO = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_FVLO]);
                    List<Object[]> N04_LO_FVLO = new ArrayList<Object[]>(N03_LO_FVLO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_FVLO.add((Object[]) structure13.toObject(mapping.Char(mapping.GetDimension(LO_FVLO)).toBytes(N03_LO_FVLO[i]), 0));
                    }
                    Object[] N03_LO_RBD = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_RBD]);
                    List<Object[]> N04_LO_RBD = new ArrayList<Object[]>(N03_LO_RBD.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_RBD.add((Object[]) structure14.toObject(mapping.Char(mapping.GetDimension(LO_RBD)).toBytes(N03_LO_RBD[i]), 0));
                    }
                    Object[] N03_LO_CLASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_CLASE]);
                    List<Object[]> N04_LO_CLASE = new ArrayList<Object[]>(N03_LO_CLASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_CLASE.add((Object[]) structure15.toObject(mapping.Char(mapping.GetDimension(LO_CLASE)).toBytes(N03_LO_CLASE[i]), 0));
                    }
                    Object[] N03_LO_BASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_BASE]);
                    List<Object[]> N04_LO_BASE = new ArrayList<Object[]>(N03_LO_BASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_BASE.add((Object[]) structure16.toObject(mapping.Char(mapping.GetDimension(LO_BASE)).toBytes(N03_LO_BASE[i]), 0));
                    }
                    Object[] N03_LO_TBASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TBASE]);
                    List<Object[]> N04_LO_TBASE = new ArrayList<Object[]>(N03_LO_TBASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TBASE.add((Object[]) structure17.toObject(mapping.Char(mapping.GetDimension(LO_TBASE)).toBytes(N03_LO_TBASE[i]), 0));
                    }
                    Object[] N03_LO_SBTBASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_SBTBASE]);
                    List<Object[]> N04_LO_SBTBASE = new ArrayList<Object[]>(N03_LO_SBTBASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_SBTBASE.add((Object[]) structure18.toObject(mapping.Char(mapping.GetDimension(LO_SBTBASE)).toBytes(N03_LO_SBTBASE[i]), 0));
                    }
                    Object[] N03_LO_TDESC = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TDESC]);
                    List<Object[]> N04_LO_TDESC = new ArrayList<Object[]>(N03_LO_TDESC.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TDESC.add((Object[]) structure19.toObject(mapping.Char(mapping.GetDimension(LO_TDESC)).toBytes(N03_LO_TDESC[i]), 0));
                    }
                    Object[] N03_LO_PDESC = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_PDESC]);
                    List<Object[]> N04_LO_PDESC = new ArrayList<Object[]>(N03_LO_PDESC.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PDESC.add((Object[]) structure20.toObject(mapping.Char(mapping.GetDimension(LO_PDESC)).toBytes(N03_LO_PDESC[i]), 0));
                    }
                    Object[] N03_LO_BREAK = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_BREAK]);
                    List<Object[]> N04_LO_BREAK = new ArrayList<Object[]>(N03_LO_BREAK.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_BREAK.add((Object[]) structure21.toObject(mapping.Char(mapping.GetDimension(LO_BREAK)).toBytes(N03_LO_BREAK[i]), 0));
                    }
                    Object[] N03_LO_INDST = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_INDST]);
                    List<Object[]> N04_LO_INDST = new ArrayList<Object[]>(N03_LO_INDST.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_INDST.add((Object[]) structure22.toObject(mapping.Char(mapping.GetDimension(LO_INDST)).toBytes(N03_LO_INDST[i]), 0));
                    }
                    Object[] N03_LO_Q = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_Q]);
                    List<Object[]> N04_LO_Q = new ArrayList<Object[]>(N03_LO_Q.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_Q.add((Object[]) structure23.toObject(mapping.Char(mapping.GetDimension(LO_Q)).toBytes(N03_LO_Q[i]), 0));
                    }
                    Object[] N03_LO_SRP = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SRP]);
                    List<Object[]> N04_LO_SRP = new ArrayList<Object[]>(N03_LO_SRP.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_SRP.add((Object[]) structure24.toObject(mapping.Char(mapping.GetDimension(LO_SRP)).toBytes(N03_LO_SRP[i]), 0));
                    }
                    Object[] N03_LO_MPA = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_MPA]);
                    List<Object[]> N04_LO_MPA = new ArrayList<Object[]>(N03_LO_MPA.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_MPA.add((Object[]) structure25.toObject(mapping.Char(mapping.GetDimension(LO_MPA)).toBytes(N03_LO_MPA[i]), 0));
                    }
                    Object[] N03_LO_ACU_O = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_O]);
                    List<Object[]> N04_LO_ACU_O = new ArrayList<Object[]>(N03_LO_ACU_O.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ACU_O.add((Object[]) structure26.toObject(mapping.Char(mapping.GetDimension(LO_ACU_O)).toBytes(N03_LO_ACU_O[i]), 0));
                    }
                    Object[] N03_LO_ACU_CD = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_CD]);
                    List<Object[]> N04_LO_ACU_CD = new ArrayList<Object[]>(N03_LO_ACU_CD.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ACU_CD.add((Object[]) structure27.toObject(mapping.Char(mapping.GetDimension(LO_ACU_CD)).toBytes(N03_LO_ACU_CD[i]), 0));
                    }
                    Object[] N03_LO_ISC = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ISC]);
                    List<Object[]> N04_LO_ISC = new ArrayList<Object[]>(N03_LO_ISC.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ISC.add((Object[]) structure28.toObject(mapping.Char(mapping.GetDimension(LO_ISC)).toBytes(N03_LO_ISC[i]), 0));
                    }
                    Object[] N03_LO_VALOR = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_VALOR]);
                    List<Object[]> N04_LO_VALOR = new ArrayList<Object[]>(N03_LO_VALOR.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_VALOR.add((Object[]) structure29.toObject(mapping.Char(mapping.GetDimension(LO_VALOR)).toBytes(N03_LO_VALOR[i]), 0));
                    }
                    Object[] N03_LO_AJUSTE = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_AJUSTE]);
                    List<Object[]> N04_LO_AJUSTE = new ArrayList<Object[]>(N03_LO_AJUSTE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_AJUSTE.add((Object[]) structure30.toObject(mapping.Char(mapping.GetDimension(LO_AJUSTE)).toBytes(N03_LO_AJUSTE[i]), 0));
                    }
                    Object[] N03_LO_Q_OUT = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_Q_OUT]);
                    List<Object[]> N04_LO_Q_OUT = new ArrayList<Object[]>(N03_LO_Q_OUT.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_Q_OUT.add((Object[]) structure31.toObject(mapping.Char(mapping.GetDimension(LO_Q_OUT)).toBytes(N03_LO_Q_OUT[i]), 0));
                    }
                    Object[] N03_LO_FACTOR = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FACTOR]);
                    List<Object[]> N04_LO_FACTOR = new ArrayList<Object[]>(N03_LO_FACTOR.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_FACTOR.add((Object[]) structure32.toObject(mapping.Char(mapping.GetDimension(LO_FACTOR)).toBytes(N03_LO_FACTOR[i]), 0));
                    }
                    Object[] N03_LO_PPROVI = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PPROVI]);
                    List<Object[]> N04_LO_PPROVI = new ArrayList<Object[]>(N03_LO_PPROVI.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PPROVI.add((Object[]) structure33.toObject(mapping.Char(mapping.GetDimension(LO_PPROVI)).toBytes(N03_LO_PPROVI[i]), 0));
                    }
                    Object[] N03_LO_PROVIS = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PROVIS]);
                    List<Object[]> N04_LO_PROVIS = new ArrayList<Object[]>(N03_LO_PROVIS.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PROVIS.add((Object[]) structure34.toObject(mapping.Char(mapping.GetDimension(LO_PROVIS)).toBytes(N03_LO_PROVIS[i]), 0));
                    }
                    Object[] N03_LO_PRRCOMM = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_PRRCOMM]);
                    List<Object[]> N04_LO_PRRCOMM = new ArrayList<Object[]>(N03_LO_PRRCOMM.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PRRCOMM.add((Object[]) structure35.toObject(mapping.Char(mapping.GetDimension(LO_PRRCOMM)).toBytes(N03_LO_PRRCOMM[i]), 0));
                    }
                    Object[] N03_LO_INDPR = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_INDPR]);
                    List<Object[]> N04_LO_INDPR = new ArrayList<Object[]>(N03_LO_INDPR.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_INDPR.add((Object[]) structure36.toObject(mapping.Char(mapping.GetDimension(LO_INDPR)).toBytes(N03_LO_INDPR[i]), 0));
                    }
                    Object[] N03_LO_TXTLOG = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_TXTLOG]);
                    List<Object[]> N04_LO_TXTLOG = new ArrayList<Object[]>(N03_LO_TXTLOG.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TXTLOG.add((Object[]) structure37.toObject(mapping.Char(mapping.GetDimension(LO_TXTLOG)).toBytes(N03_LO_TXTLOG[i]), 0));
                    }
                    Object[] N03_LO_VIA = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_VIA]);
                    List<Object[]> N04_LO_VIA = new ArrayList<Object[]>(N03_LO_VIA.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_VIA.add((Object[]) structure38.toObject(mapping.Char(mapping.GetDimension(LO_VIA)).toBytes(N03_LO_VIA[i]), 0));
                    }
                    Object[] N03_LO_DIFL = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_DIFL]);
                    List<Object[]> N04_LO_DIFL = new ArrayList<Object[]>(N03_LO_DIFL.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_DIFL.add((Object[]) structure39.toObject(mapping.Char(mapping.GetDimension(LO_DIFL)).toBytes(N03_LO_DIFL[i]), 0));
                    }
                    Object[] N03_LO_INDIF = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_INDIF]);
                    List<Object[]> N04_LO_INDIF = new ArrayList<Object[]>(N03_LO_INDIF.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_INDIF.add((Object[]) structure40.toObject(mapping.Char(mapping.GetDimension(LO_INDIF)).toBytes(N03_LO_INDIF[i]), 0));
                    }
                    Object[] N03_LO_TFM_I = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_I]);
                    List<Object[]> N04_LO_TFM_I = new ArrayList<Object[]>(N03_LO_TFM_I.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TFM_I.add((Object[]) structure41.toObject(mapping.Char(mapping.GetDimension(LO_TFM_I)).toBytes(N03_LO_TFM_I[i]), 0));
                    }
                    Object[] N03_LO_TFM_MDA = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_MDA]);
                    List<Object[]> N04_LO_TFM_MDA = new ArrayList<Object[]>(N03_LO_TFM_MDA.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TFM_MDA.add((Object[]) structure42.toObject(mapping.Char(mapping.GetDimension(LO_TFM_MDA)).toBytes(N03_LO_TFM_MDA[i]), 0));
                    }
                    Object[] N03_LO_ACU_I = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_ACU_I]);
                    List<Object[]> N04_LO_ACU_I = new ArrayList<Object[]>(N03_LO_ACU_I.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ACU_I.add((Object[]) structure43.toObject(mapping.Char(mapping.GetDimension(LO_ACU_I)).toBytes(N03_LO_ACU_I[i]), 0));
                    }
                    Object[] N03_LO_Q_IN = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_Q_IN]);
                    List<Object[]> N04_LO_Q_IN = new ArrayList<Object[]>(N03_LO_Q_IN.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_Q_IN.add((Object[]) structure44.toObject(mapping.Char(mapping.GetDimension(LO_Q_IN)).toBytes(N03_LO_Q_IN[i]), 0));
                    }
                    Object[] N03_LO_YANQUI = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_YANQUI]);
                    List<Object[]> N04_LO_YANQUI = new ArrayList<Object[]>(N03_LO_YANQUI.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_YANQUI.add((Object[]) structure45.toObject(mapping.Char(mapping.GetDimension(LO_YANQUI)).toBytes(N03_LO_YANQUI[i]), 0));
                    }
                    String N03_LK_TAJUSTE = N02_DATOS_OUPUT[30].toString();
                    //</editor-fold>

                    if (mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO]).equals("0")) {
                        double totalSRP = 0;
                        double totalMPA = 0;
                        double totalVALOR = 0;
                        double totalQ = 0;
                        int j = 0;
                        for (int i = 0; i < 200; i++) {
                            if (!mapping.getString(N04_LO_TRANSP.get(i)[0]).trim().equals("")) {
                                objRtn = new A720();
                                objRtn.TKT = mapping.getString(N04_LO_BOLETO.get(i)[0]).trim();
                                j++;
                                if (j == 5) {
                                    j = 1;
                                }
                                objRtn.CPNPR = j + "";//(i + 1) + "";
                                objRtn.A720RUTAO = mapping.getString(N04_LO_RUTING.get(i)[0]).trim();
                                objRtn.A720RUTAD = mapping.getString(N04_LO_RUTING.get(i + 1)[0]).trim();
                                objRtn.A720CONEX = mapping.getString(N04_LO_XO.get(i)[0]).trim();
                                objRtn.A720CARRA = mapping.getString(N04_LO_TRANSP.get(i)[0]).trim();
                                objRtn.A720NVLO = mapping.getString(N04_LO_NVLO.get(i)[0]).trim();
                                objRtn.A720FVLO = mapping.getString(N04_LO_FVLO.get(i)[0]).trim();
                                objRtn.A720BOOKI = mapping.getString(N04_LO_RBD.get(i)[0]).trim();
                                objRtn.A720CLASE = mapping.getString(N04_LO_CLASE.get(i)[0]).trim();
                                objRtn.A720FBUSO = mapping.getString(N04_LO_BASE.get(i)[0]).trim();
                                objRtn.A720TBASE = mapping.getString(N04_LO_TBASE.get(i)[0]).trim();
                                objRtn.A720STBAS = mapping.getString(N04_LO_SBTBASE.get(i)[0]).trim();
                                objRtn.A720TDESC = mapping.getString(N04_LO_TDESC.get(i)[0]).trim();
                                objRtn.A720PORDS = mapping.getDouble(N04_LO_PDESC.get(i)[0]);
                                objRtn.A720FARE = mapping.getDouble(N04_LO_BREAK.get(i)[0]);
                                objRtn.A720TFARE = mapping.getString(N04_LO_INDST.get(i)[0]).trim();
                                objRtn.A720SS = mapping.getDouble(N04_LO_Q.get(i)[0]);
                                objRtn.A720VLSRP = mapping.getDouble(N04_LO_SRP.get(i)[0]);
                                objRtn.A720VLMPA = mapping.getDouble(N04_LO_MPA.get(i)[0]);
                                objRtn.A720ACUEO = mapping.getDouble(N04_LO_ACU_O.get(i)[0]);
                                objRtn.A720ACUCD = mapping.getString(N04_LO_ACU_CD.get(i)[0]).trim();
                                objRtn.A720ISC = mapping.getDouble(N04_LO_ISC.get(i)[0]);
                                objRtn.A720VALOR = mapping.getDouble(N04_LO_VALOR.get(i)[0]);
                                objRtn.A720AJUST = mapping.getDouble(N04_LO_AJUSTE.get(i)[0]);
                                objRtn.A720Q = mapping.getDouble(N04_LO_Q_OUT.get(i)[0]);
                                objRtn.A720FACT = mapping.getDouble(N04_LO_FACTOR.get(i)[0]);
                                objRtn.A720PPRO = mapping.getDouble(N04_LO_PPROVI.get(i)[0]);
                                objRtn.A720PROV = mapping.getDouble(N04_LO_PROVIS.get(i)[0]);
                                objRtn.A720PRRCM = mapping.getDouble(N04_LO_PRRCOMM.get(i)[0]);
                                objRtn.A720PRSCM = 0.00;//mapping.getDouble(N04_LO_PRRCOMM.get(i)[0]);
                                objRtn.A720YQ = 0.00;//mapping.getDouble(N04_LO_PRRCOMM.get(i)[0]);
                                objRtn.A720INDPR = mapping.getString(N04_LO_INDPR.get(i)[0]).trim();
                                objRtn.A720VIA = mapping.getString(N04_LO_VIA.get(i)[0]).trim();
                                objRtn.A720DIFL = mapping.getDouble(N04_LO_DIFL.get(i)[0]);
                                objRtn.A720INDIF = mapping.getString(N04_LO_INDIF.get(i)[0]).trim();
                                objRtn.A720TRFM = mapping.getDouble(N04_LO_TFM_I.get(i)[0]);
                                objRtn.A720MNTFM = mapping.getString(N04_LO_TFM_MDA.get(i)[0]).trim();
                                objRtn.A720ACUE = mapping.getDouble(N04_LO_ACU_I.get(i)[0]);
                                objRtn.A720QIN = mapping.getDouble(N04_LO_Q_IN.get(i)[0]);
                                objRtn.A720TAJUST = Double.parseDouble(N03_LK_TAJUSTE);
                                objRtn.A720YANQ = mapping.getDouble(N04_LO_YANQUI.get(i)[0]);
                                objRtn.LO_TXTLOG = mapping.getString(N04_LO_TXTLOG.get(i)[0]).trim();
                                objRtn.LK_ESTADO = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO]).trim();
                                objRtn.LK_CODERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_CODERROR]).trim();
                                objRtn.LK_MSJERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_MSJERROR]).trim();
                                totalSRP = totalSRP + objRtn.A720VLSRP;
                                totalMPA = totalMPA + objRtn.A720VLMPA;
                                totalVALOR = totalVALOR + objRtn.A720VALOR;
                                totalQ = totalQ + objRtn.A720Q;
                                lstProrate.add(objRtn);
                            } else {
                                objRtn = new A720();
                                objRtn.A720CONEX = "Z";
                                objRtn.A720VLSRP = totalSRP;
                                objRtn.A720VLMPA = totalMPA;
                                objRtn.A720VALOR = totalVALOR;
                                objRtn.A720Q = totalQ;
                                lstProrate.add(objRtn);
                                i = 201;
                            }
                        }
                    } else {
                        objRtn = new A720();
                        objRtn.LK_ESTADO = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO]).trim();
                        objRtn.LK_CODERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_CODERROR]).trim();
                        objRtn.LK_MSJERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_MSJERROR]).trim();
                        lstProrate.add(objRtn);
                    }
                }
            } finally {
                session.getCNXIBMDB2().closeSystem();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstProrate;
    }

    public A720 mantenaince_Prorate(PRORATEFilter beanProrate, A720 lstProrate, String airlin, String grupo, String seq, String OP) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL SQP00797(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        A720 objRtn = new A720();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            //OUT REGISTER
            cstmt.registerOutParameter(83, Types.VARCHAR);
            cstmt.registerOutParameter(84, Types.VARCHAR);
            cstmt.registerOutParameter(85, Types.VARCHAR);
            cstmt.registerOutParameter(86, Types.VARCHAR);

            cstmt.setString(1, lstProrate.CPNPR);
            cstmt.setString(2, airlin);
            cstmt.setString(3, lstProrate.TKT.substring(0, 3));
            cstmt.setString(4, lstProrate.TKT.substring(3, 7));
            cstmt.setString(5, lstProrate.TKT.substring(7, 13));
            cstmt.setString(6, seq);
            cstmt.setString(7, grupo);
            cstmt.setString(8, lstProrate.A720CONEX);
            cstmt.setString(9, lstProrate.A720RUTAO);
            cstmt.setString(10, lstProrate.A720RUTAD);
            cstmt.setString(11, lstProrate.A720CARRA);
            cstmt.setString(12, lstProrate.A720NVLO);
            cstmt.setString(13, lstProrate.A720FVLO);
            cstmt.setString(14, lstProrate.A720BOOKI);
            cstmt.setString(15, lstProrate.A720CLASE);
            cstmt.setString(16, lstProrate.A720FBUSO);
            cstmt.setString(17, lstProrate.A720FBUSO);
            cstmt.setString(18, lstProrate.A720TBASE);
            cstmt.setString(19, lstProrate.A720STBAS);
            cstmt.setString(20, lstProrate.A720TDESC);
            cstmt.setDouble(21, lstProrate.A720PORDS);
            cstmt.setString(22, lstProrate.A720VIA);
            cstmt.setDouble(23, lstProrate.A720FARE);
            cstmt.setString(24, lstProrate.A720TFARE);
            cstmt.setDouble(25, lstProrate.A720SS);
            cstmt.setDouble(26, lstProrate.A720DIFL);
            cstmt.setString(27, lstProrate.A720INDIF);
            cstmt.setDouble(28, lstProrate.A720TRFM);
            cstmt.setString(29, lstProrate.A720MNTFM);
            cstmt.setDouble(30, lstProrate.A720VLSRP);
            cstmt.setDouble(31, lstProrate.A720VLMPA);
            cstmt.setDouble(32, lstProrate.A720ACUE);
            cstmt.setDouble(33, lstProrate.A720ISC);
            cstmt.setDouble(34, lstProrate.A720AJUST);
            cstmt.setDouble(35, lstProrate.A720VALOR);
            DecimalFormat df = new DecimalFormat("#.00");
            String VALOL = df.format(lstProrate.A720VALOR / (Double.parseDouble(beanProrate.LK_ATBP_TC) / 1000000));
            cstmt.setDouble(36, Double.parseDouble(VALOL.replace(",", ".")));
            cstmt.setDouble(37, lstProrate.A720ACUEO);
            cstmt.setDouble(38, lstProrate.A720QIN);
            cstmt.setDouble(39, lstProrate.A720Q);
            cstmt.setDouble(40, lstProrate.A720FACT);
            cstmt.setDouble(41, lstProrate.A720PPRO);
            cstmt.setDouble(42, lstProrate.A720PROV);
            cstmt.setDouble(43, lstProrate.A720PRRCM);
            cstmt.setString(44, lstProrate.A720INDPR);
            //Generales
            cstmt.setString(45, beanProrate.LK_FVENTA);
            cstmt.setString(46, beanProrate.LK_IT);
            cstmt.setString(47, beanProrate.LK_CTYVTA);
            cstmt.setString(48, beanProrate.LK_COUVTA);
            cstmt.setString(49, beanProrate.LK_CTYEMI);
            cstmt.setString(50, beanProrate.LK_COUEMI);
            cstmt.setDouble(51, lstProrate.A720TAJUST);
            cstmt.setString(52, "1");//STAT
            cstmt.setString(53, beanProrate.LK_BASE_DOM);
            cstmt.setString(54, beanProrate.LK_REGI_MDA);
            cstmt.setString(55, beanProrate.LK_SYST_MDA);
            cstmt.setString(56, beanProrate.LK_FRMTYP);
            //Solo TKT Padre
            cstmt.setDouble(57, Double.parseDouble(beanProrate.LK_FARE) / 100);
            cstmt.setString(58, beanProrate.LK_FARE_MDA);
            cstmt.setDouble(59, Double.parseDouble(beanProrate.LK_EQV_FARE) / 100);
            cstmt.setString(60, beanProrate.LK_EQV_MDA);
            cstmt.setDouble(61, Double.parseDouble(beanProrate.LK_NUC) / 100);
            cstmt.setString(62, beanProrate.MDABFARE);
            cstmt.setDouble(63, beanProrate.BASEFARE);
            cstmt.setString(64, beanProrate.CURR);
            cstmt.setDouble(65, beanProrate.FARERV);
            cstmt.setDouble(66, Double.parseDouble(beanProrate.LK_ROE) / 1000000);
            cstmt.setDouble(67, Double.parseDouble(beanProrate.LK_TSTOPOVER) / 100);
            cstmt.setInt(68, Integer.parseInt(beanProrate.LK_QSTOPOVER));
            cstmt.setDouble(69, Double.parseDouble(beanProrate.LK_TPLUS) / 100);
            cstmt.setDouble(70, Double.parseDouble(beanProrate.LK_TAJUST_Q) / 100);
            cstmt.setDouble(71, Double.parseDouble(beanProrate.LK_COMMIS) / 100);
            cstmt.setString(72, beanProrate.LK_MDACOMM);
            cstmt.setDouble(73, beanProrate.PORCOM / 100);
            cstmt.setString(74, beanProrate.CIAI);
            cstmt.setString(75, beanProrate.FORMAI);
            cstmt.setString(76, beanProrate.SERIEI);
            cstmt.setString(77, beanProrate.CUPON1);
            cstmt.setString(78, beanProrate.CUPON2);
            cstmt.setString(79, beanProrate.CUPON3);
            cstmt.setString(80, beanProrate.CUPON4);
            cstmt.setString(81, OP);
            cstmt.setDouble(82, lstProrate.A720YANQ);
            cstmt.execute();

            objRtn.A720STAT = cstmt.getString(83);
            objRtn.A720MIAERR = cstmt.getString(84);
            objRtn.dbException.SQLCODE = cstmt.getString(85);
            objRtn.dbException.MESSAGE = cstmt.getString(86);
        } finally {
            if (cstmt != null) {
                //try { cstmt.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return objRtn;
    }
    
    public FACSIMILFilter loadISRFacsimilProrate(String ccust, BSPF104 filter, HashMap hmCiudades) throws SQLException, Exception {
        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null, rst2 = null, rstConj = null;
        PreparedStatement stmt = null;
        PreparedStatement stmtConj = null;
        FACSIMILFilter beanFacsimil = new FACSIMILFilter();
        List<BSPF63> lstReg63 = new ArrayList<BSPF63>();
        List<String> lstTaxes = new ArrayList<String>();
        List<String> lstReg46Restrict = new ArrayList<String>();
        List<String> lstReg46OrigIssue = new ArrayList<String>();
        List<String> lstFC = new ArrayList<String>();
        List<String> lstFOP = new ArrayList<String>();
        BSPF63 reg63;
        String strConj = "";
        String strSQLUSO = "";
        String strSQLLEG = "";
        String OU_SEQ = "";
        String OU_NROID = "";
        
        Connection cnx = null;
        try {
            String strSQL = "SELECT * FROM PRAXIS.A1419A WHERE CXRRNUM = ? AND CIA = ? AND FORMASERIE = ?";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.prepareStatement(strSQL);

            String ccia, strFormSerie;
            
            ccia = filter.TDNR.trim().substring(0, 3);
            strFormSerie = filter.TDNR.trim().substring(3, 13);
            
            stmt.setString(1, ccust);
            stmt.setString(2, ccia);
            stmt.setString(3, strFormSerie);
            
            rst = stmt.executeQuery();

            beanFacsimil.CCUST = ccust.trim();
            beanFacsimil.FUENTE = "ISR";
            beanFacsimil.COUNTRY = filter.COUNTRY.trim();
            beanFacsimil.nombre = filter.nombre.trim();

            String trama = "";
            String strConjRelative, strConjTotal, strFormSerCnj;
            int strCalcCnj = 0;
            String strConjTkts = "";
            Boolean encontroData = false;
            Boolean bObtenerTktPadre = false;
            
            String strTKTPadre = "";
            String strTKTPadreCnj = "";
            
            while(rst.next()) {
                encontroData = true;
                String TCNMAXLONG = Functions.fillString(rst.getString("TCNMAXLONG"), 358);
                String cxrrnum = rst.getString("CIA");
                System.out.println(TCNMAXLONG);
                
                switch (Integer.parseInt(rst.getString("RCID"))) {
                    case 1: {
                        beanFacsimil.DAIS = TCNMAXLONG.substring(114, 122).trim();
                        beanFacsimil.PNRR = TCNMAXLONG.substring(49, 62).trim();
                        beanFacsimil.TDNR = rst.getString("TDNR").trim();
                        beanFacsimil.CDGT = "";//notMapped digito chequeo?
                        beanFacsimil.TRNC = "";//notMapped transaccion
                        beanFacsimil.AGTN = TCNMAXLONG.substring(123, 131).trim();
                        beanFacsimil.PXNM = TCNMAXLONG.substring(65, 114).trim();
                        
                        if(!bObtenerTktPadre){
                            strTKTPadre = rst.getString("CIAFATHER") + rst.getString("FORSERFATH");
                            bObtenerTktPadre = true;

                            if(strTKTPadre.length()>0){
                                beanFacsimil.strEsCjn = beanFacsimil.TDNR.equals(strTKTPadre) ? "" : "C";
                                strTKTPadreCnj = strTKTPadre.substring(3,13);

                                //Traer TKT hijos conjuncion
                                String strSQLConj = "SELECT DISTINCT CIA, FORMASERIE FROM PRAXIS.A1419A WHERE CXRRNUM = ? AND CIAFATHER = ? AND FORSERFATH = ? AND RCID = '01'";
                                stmtConj = cnx.prepareStatement(strSQLConj);

                                String cciaPadre, strFormSeriePadre;

                                cciaPadre = strTKTPadre.substring(0, 3);
                                strFormSeriePadre = strTKTPadre.substring(3, 13);

                                stmtConj.setString(1, ccust);
                                stmtConj.setString(2, cciaPadre);
                                stmtConj.setString(3, strFormSeriePadre);

                                rstConj = stmtConj.executeQuery();
                                int cx = 0;
                                while(rstConj.next()) {
                                    if(cx>0){
                                        String seq = rstConj.getString("FORMASERIE").substring(8,10);
                                        strTKTPadreCnj += "-" + seq;
                                    }
                                    
                                    cx = cx + 1;
                                }
                            }
                        }                        
                        
                        beanFacsimil.strConjuncion = strTKTPadreCnj;
                    } break;
                        
                    case 3:{
                        beanFacsimil.CUTP1 = TCNMAXLONG.substring(39, 42).trim();
                        beanFacsimil.FARE = TCNMAXLONG.substring(42, 50).trim();
                        beanFacsimil.EQFR = TCNMAXLONG.substring(50, 62).trim();
                        beanFacsimil.TODC = TCNMAXLONG.substring(10, 17).trim();
                        beanFacsimil.TOUR = TCNMAXLONG.substring(105, 121).trim();
                        
                        String strReg46Restrict = TCNMAXLONG.substring(204, 352).trim();
                        lstReg46Restrict.add(strReg46Restrict);
                        beanFacsimil.lstReg46Restrict = lstReg46Restrict;
                        
                        String strTax01 = "", strTax02 = "", strTax03 = "", strTotal = "", strOrigIssue = "";
                        
                        strTax01 = TCNMAXLONG.substring(61, 72);
                        lstTaxes.add(strTax01);
                        
                        strTax02 = TCNMAXLONG.substring(72, 83);
                        lstTaxes.add(strTax02);
                        
                        strTax03 = TCNMAXLONG.substring(83, 94);
                        lstTaxes.add(strTax03);
                        
                        beanFacsimil.lstTaxes = lstTaxes;
                        
                        strTotal = TCNMAXLONG.substring(94, 105);
                        beanFacsimil.TOTL = strTotal;
                        
                        
                        strOrigIssue = TCNMAXLONG.substring(172, 204);
                        beanFacsimil.lstReg46OrigIssue.add(strOrigIssue);
                    } break;
                        
                    case 4:{
                        String taxes = "";
                        taxes = taxes + TCNMAXLONG.trim() + "\n" + "***************************************";
                    } break;
                    
                    case 5:{
                        String strItinerario = TCNMAXLONG;
                        
//RECORD 63 - Itinerary Data Segment
                        //stmt = session.getCNXIBMDB2().getConnection().createStatement();
                        int x63 = 89;
                        for (int i = 0; i < 4; i++) {
                            if ((strItinerario.substring(0 + (i * x63), 3 + (i * x63)).trim().length() > 0) || (strItinerario.substring(60 + (i * x63), 63 + (i * x63)).trim().length() > 0)) {
                                reg63 = new BSPF63();
                                reg63.CDGT = (i + 1);
                                reg63.STPO = strItinerario.substring( 2 + (i * x63),  3 + (i * x63));
                                reg63.ORAC = strItinerario.substring( 3 + (i * x63),  6 + (i * x63));
                                reg63.DSTC = strItinerario.substring( 8 + (i * x63), 11 + (i * x63));
                                reg63.CARR = strItinerario.substring(15 + (i * x63), 19 + (i * x63));
                                reg63.FTNR = strItinerario.substring(25 + (i * x63), 30 + (i * x63));
                                //reg63.DAIS = strItinerario.substring(35 + (i * x63), 40 + (i * x63));
                                reg63.RBKD = strItinerario.substring(30 + (i * x63), 32 + (i * x63));
                                reg63.FTDA = strItinerario.substring(35 + (i * x63), 40 + (i * x63));
                                reg63.FTDT = strItinerario.substring(50 + (i * x63), 54 + (i * x63));
                                reg63.FBST = strItinerario.substring(60 + (i * x63), 62 + (i * x63));
                                reg63.FBTD = strItinerario.substring(65 + (i * x63), 80 + (i * x63));
                                reg63.NBDA = strItinerario.substring(40 + (i * x63), 45 + (i * x63));
                                reg63.NADA = strItinerario.substring(45 + (i * x63), 50 + (i * x63));
                                
                                try {
                                    if (hmCiudades.containsKey(reg63.ORAC.trim())) {
                                        reg63.strDescFrom = reg63.ORAC + " - " + hmCiudades.get(reg63.ORAC.trim()).toString();
                                    } else {
                                        reg63.strDescFrom = reg63.ORAC;
                                    }
                                    if (hmCiudades.containsKey(reg63.DSTC.trim())) {
                                        reg63.strDescTo = reg63.DSTC + " - " + hmCiudades.get(reg63.DSTC.trim()).toString();
                                    } else {
                                        reg63.strDescTo = reg63.DSTC;
                                    }
                                } catch (Exception e) {
                                    
                                }

                                lstReg63.add(reg63);
                            }
                        }                        
                        
                        beanFacsimil.lstReg63 = lstReg63;
                        
                    } break;
                        
                    case 7: {
                        String strFormPay = TCNMAXLONG.substring(0, 10) + TCNMAXLONG.substring(123, 133);
                        lstFOP.add(strFormPay);
                        
                        beanFacsimil.lstFOP = lstFOP;
                    } break;
                        
                    case 8:{
                        String strFC = TCNMAXLONG.substring(2);
                        lstFC.add(strFC);
                        
                        beanFacsimil.lstFC = lstFC;
                    } break;
                }
                                

                /*
                List<A005> airlines = new ArrayList<>();
                utilDAO = new UtilDAO(session);
                airlines = utilDAO.obtainAirlines();
                
                String issuedBy = "";
                
                for(A005 airline : airlines){
                    if(airline.A005KEY.equals(cxrrnum)){
                        issuedBy = airline.A005KEY1;
                        break;
                    }
                }*/
            }
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
            if (rst2 != null) {
                try {
                    rst2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (stmt != null) {
                stmt.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs2 != null) {
                try {
                    cs2.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();

            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        
        return beanFacsimil;
    }
    
     public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

}
