/*
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : PRO11002Linkage                                   *
 * Created on : 07-04-2017, 11:36:28                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201701 RMC 07-04-2017 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
package net.miatech.beans.linkage;

import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramParameter;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PRO11002Filter;
import net.miatech.utils.AS400Map;
import org.apache.commons.lang.StringUtils;

/**
 *
 * @author rmayta
 */
public class PRO11002Linkage {
    public String programPath;
    public ProgramParameter[] parameterList;
    public PRO11002Filter returnFilter;
    public List<PRO11002Filter> returnList;
    //<editor-fold defaultstate="collapsed" desc="01 P_INPUT                    ">
    private AS400DataType[] P_INPUT = new AS400DataType[5];
    private class IDX_P_INPUT {
        private static final int IN_CCUST = 0;
        private static final int IN_CIA = 1;
        private static final int IN_FORMA = 2;
        private static final int IN_SERIE = 3;
        private static final int IN_SEQT = 4;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="01 P_OUTPUT                   ">
    private AS400DataType[] P_OUTPUT = new AS400DataType[1];
    private class IDX_P_OUTPUT {
        private static final int LS_REC = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LSTREC                  ">
    private AS400DataType[] LSTREC = new AS400DataType[1];
    private class IDX_LSTREC {
        private static final int IT_LSTREC = 0;
    }    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="   02 LS_REC                  ">
    private AS400DataType[] LS_REC = new AS400DataType[28];
    private class IDX_LS_REC {
        private static final int LK_CCUST = 0;
        private static final int LK_CIA = 1;
        private static final int LK_FORMA = 2;
        private static final int LK_SERIE = 3;
        private static final int LK_CUPON = 4;
        private static final int LK_SEQ = 5;
        private static final int LK_MODO = 6;
        private static final int LK_FUENT = 7;
        private static final int LK_ESTAD = 8;
        private static final int LK_FFILE = 9;
        private static final int LK_FPRO = 10;
        private static final int LK_GRUPO = 11;
        private static final int LK_CUR = 12;
        private static final int LK_ACTIV = 13;
        private static final int LK_PASIV = 14;
        private static final int LK_SUBFU = 15;
        private static final int LK_FP = 16;
        private static final int LK_CUENT = 17;
        private static final int LK_SUBCU = 18;
        private static final int LK_IDFIL = 19;
        private static final int LK_TIDOC = 20;
        private static final int LK_ORIG = 21;
        private static final int LK_FCONT = 22;
        private static final int LK_TITU = 23;
        private static final int LK_COPE = 24;
        private static final int LK_PROV = 25;
        private static final int LK_IDCON = 26;
        private static final int LK_TCOL = 27;
    }
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Structure                     ">
    private final AS400Structure STRUC_P_OUTPUT;
    private final AS400Structure STRUC_LSTREC;
    private final AS400Structure STRUC_LS_REC;
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Mapping                       ">
    private AS400Map mapping = new AS400Map();
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Input                         ">
    public String IN_CCUST = "";
    public String IN_CIA = "";
    public String IN_FORMA = "";
    public String IN_SERIE = "";
    public String IN_SEQT = "";
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Output                        ">
    private Object[] IT_LSTREC;
    
    private List<PRO11002Filter> ITEM_REC;
    //</editor-fold>
    public PRO11002Linkage(String library, PRO11002Filter filter){
        IN_CCUST = filter.IN_CCUST;
        IN_CIA = filter.IN_CIA;
        IN_FORMA = filter.IN_FORMA;
        IN_SERIE = filter.IN_SERIE;
        IN_SEQT = filter.IN_SEQT;

        programPath = "/QSYS.LIB/" + library + ".LIB/PRO11002.PGM";
        //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
        P_INPUT[IDX_P_INPUT.IN_CCUST] = mapping.Char(3);
        P_INPUT[IDX_P_INPUT.IN_CIA] = mapping.Char(3);
        P_INPUT[IDX_P_INPUT.IN_FORMA] = mapping.Char(4);
        P_INPUT[IDX_P_INPUT.IN_SERIE] = mapping.Char(6);
        P_INPUT[IDX_P_INPUT.IN_SEQT] = mapping.Char(2);
        
        LS_REC[IDX_LS_REC.LK_CCUST] = mapping.Char(3);
        LS_REC[IDX_LS_REC.LK_CIA] = mapping.Char(5);
        LS_REC[IDX_LS_REC.LK_FORMA] = mapping.Char(4);
        LS_REC[IDX_LS_REC.LK_SERIE] = mapping.Char(6);
        LS_REC[IDX_LS_REC.LK_CUPON] = mapping.Char(1);
        LS_REC[IDX_LS_REC.LK_SEQ] = mapping.Char(3);
        LS_REC[IDX_LS_REC.LK_MODO] = mapping.Char(1);
        LS_REC[IDX_LS_REC.LK_FUENT] = mapping.Char(3);
        LS_REC[IDX_LS_REC.LK_ESTAD] = mapping.Char(1);
        LS_REC[IDX_LS_REC.LK_FFILE] = mapping.Char(8);
        LS_REC[IDX_LS_REC.LK_FPRO] = mapping.Char(8);
        LS_REC[IDX_LS_REC.LK_GRUPO] = mapping.Char(9);
        LS_REC[IDX_LS_REC.LK_CUR] = mapping.Char(3);
        LS_REC[IDX_LS_REC.LK_ACTIV] = mapping.Numeric(11, 2);
        LS_REC[IDX_LS_REC.LK_PASIV] = mapping.Numeric(11, 2);
        LS_REC[IDX_LS_REC.LK_SUBFU] = mapping.Char(3);
        LS_REC[IDX_LS_REC.LK_FP] = mapping.Char(2);
        LS_REC[IDX_LS_REC.LK_CUENT] = mapping.Char(36);
        LS_REC[IDX_LS_REC.LK_SUBCU] = mapping.Char(5);
        LS_REC[IDX_LS_REC.LK_IDFIL] = mapping.Char(9);
        LS_REC[IDX_LS_REC.LK_TIDOC] = mapping.Char(15);
        LS_REC[IDX_LS_REC.LK_ORIG] = mapping.Char(3);
        LS_REC[IDX_LS_REC.LK_FCONT] = mapping.Char(35);
        LS_REC[IDX_LS_REC.LK_TITU] = mapping.Char(30);
        LS_REC[IDX_LS_REC.LK_COPE] = mapping.Char(10);
        LS_REC[IDX_LS_REC.LK_PROV] = mapping.Char(10);
        LS_REC[IDX_LS_REC.LK_IDCON] = mapping.Char(35);
        LS_REC[IDX_LS_REC.LK_TCOL] = mapping.Char(10);
        
        LSTREC[IDX_LSTREC.IT_LSTREC] = mapping.Char(mapping.GetDimension(LS_REC));
        P_OUTPUT[IDX_P_OUTPUT.LS_REC] = mapping.Occurs(LSTREC[IDX_LSTREC.IT_LSTREC], 1000);
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="{...} Structure">
        STRUC_P_OUTPUT = new AS400Structure(P_OUTPUT);
        STRUC_LSTREC = new AS400Structure(LSTREC);
        STRUC_LS_REC = new AS400Structure(LS_REC);
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="{...} Parameters">
        parameterList = new ProgramParameter[2];
        parameterList[0] = new ProgramParameter(P_INPUT());
        parameterList[1] = new ProgramParameter(mapping.GetDimension(P_OUTPUT));
        //</editor-fold>
    }
    
    private byte[] P_INPUT(){
        String data = StringUtils.rightPad(IN_CCUST, P_INPUT[IDX_P_INPUT.IN_CCUST].getByteLength()) +
                StringUtils.rightPad(IN_CIA, P_INPUT[IDX_P_INPUT.IN_CIA].getByteLength()) +
                StringUtils.rightPad(IN_FORMA, P_INPUT[IDX_P_INPUT.IN_FORMA].getByteLength()) +
                StringUtils.rightPad(IN_SERIE, P_INPUT[IDX_P_INPUT.IN_SERIE].getByteLength()) +
                StringUtils.leftPad(IN_SEQT, P_INPUT[IDX_P_INPUT.IN_SEQT].getByteLength(), "0");
        return mapping.Char(mapping.GetDimension(P_INPUT)).toBytes(data);
    }
    
    private void P_OUTPUT() throws Exception {
        //<editor-fold defaultstate="collapsed" desc="{...} Map">
        Object[] N01_P_OUTPUT = (Object[])STRUC_P_OUTPUT.toObject(parameterList[1].getOutputData(), 0);
        ITEM_REC = new ArrayList<PRO11002Filter>();
        PRO11002Filter filterItem;
        Object[] N02_LS_REC = (Object[]) N01_P_OUTPUT[IDX_P_OUTPUT.LS_REC];
        Object[] N03_ITEM_REC;
        String LK_ACTIV;
        for (Object N02_LS_REC1 : N02_LS_REC) {
            IT_LSTREC = (Object[]) STRUC_LSTREC.toObject(LSTREC[IDX_LSTREC.IT_LSTREC].toBytes(N02_LS_REC1), 0);
            LK_ACTIV = mapping.getString(IT_LSTREC[IDX_LSTREC.IT_LSTREC]).substring(55, 68).trim();
            if(!LK_ACTIV.isEmpty()){
                N03_ITEM_REC = (Object[]) STRUC_LS_REC.toObject(LSTREC[IDX_LSTREC.IT_LSTREC].toBytes(N02_LS_REC1), 0);
                filterItem = new PRO11002Filter();
                filterItem.LK_CCUST = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_CCUST]).trim();
                filterItem.LK_CIA = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_CIA]).trim();
                filterItem.LK_FORMA = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_FORMA]).trim();
                filterItem.LK_SERIE = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_SERIE]).trim();
                filterItem.LK_CUPON = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_CUPON]).trim();
                filterItem.LK_SEQ = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_SEQ]).trim();
                filterItem.LK_MODO = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_MODO]).trim();
                filterItem.LK_FUENT = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_FUENT]).trim();
                filterItem.LK_ESTAD = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_ESTAD]).trim();
                filterItem.LK_FFILE = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_FFILE]).trim();
                filterItem.LK_FPRO = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_FPRO]).trim();
                filterItem.LK_GRUPO = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_GRUPO]).trim();
                filterItem.LK_CUR = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_CUR]).trim();
                filterItem.LK_ACTIV = mapping.getDouble(N03_ITEM_REC[IDX_LS_REC.LK_ACTIV]);
                filterItem.LK_PASIV = mapping.getDouble(N03_ITEM_REC[IDX_LS_REC.LK_PASIV]);
                filterItem.LK_SUBFU = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_SUBFU]).trim();
                filterItem.LK_FP = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_FP]).trim();
                filterItem.LK_CUENT = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_CUENT]).trim();
                filterItem.LK_SUBCU = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_SUBCU]).trim();
                filterItem.LK_IDFIL = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_IDFIL]).trim();
                filterItem.LK_TIDOC = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_TIDOC]).trim();
                filterItem.LK_ORIG = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_ORIG]).trim();
                filterItem.LK_FCONT = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_FCONT]).trim();
                filterItem.LK_TITU = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_TITU]).trim();
                filterItem.LK_COPE = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_COPE]).trim();
                filterItem.LK_PROV = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_PROV]).trim();
                filterItem.LK_IDCON = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_IDCON]).trim();
                filterItem.LK_TCOL = mapping.getString(N03_ITEM_REC[IDX_LS_REC.LK_TCOL]).trim();
                ITEM_REC.add(filterItem);
            }else{
                break;
            }
        }
        //</editor-fold>
        returnFilter = new PRO11002Filter();
        returnList = ITEM_REC;
    }
    
    public boolean prepareOutput(){
        try{
            P_OUTPUT();
        }catch(Exception e){
            return false;
        }
        return true;
    }
}
