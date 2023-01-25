/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils;

import com.ibm.as400.access.AS400Array;
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Text;
import com.ibm.as400.access.AS400ZonedDecimal;
import java.math.BigDecimal;

/**
 *
 * @author rmayta
 */
public class AS400Map {

    public AS400Map() {
    }

    public AS400Text Char(int size) {
        return new AS400Text(size);
    }

    public AS400ZonedDecimal Numeric(int size, int dsize) {
        return Numeric(size, dsize, false);
    }

    public AS400ZonedDecimal Numeric(int size, int dsize, boolean signo) {
//        if(signo) size++;
//        if(dsize > 0) size++;
        return new AS400ZonedDecimal((size + dsize), dsize);
    }

    public int GetDimension(AS400DataType[] rs) {
        return GetDimension(rs, false);
    }

    public int GetDimension(AS400DataType[] rs, boolean toCBL) {
        int c = 0;
        AS400ZonedDecimal as400ZoneDecimal;
        if (toCBL) {
            for (int i = 0; i < rs.length; ++i) {
                c += rs[i].getByteLength();
            }
        } else {
            for (int i = 0; i < rs.length; ++i) {
                if(rs[i].getInstanceType() == AS400DataType.TYPE_ZONED){
                    as400ZoneDecimal = (AS400ZonedDecimal)rs[i];
                    //c += as400ZoneDecimal.getNumberOfDigits() + as400ZoneDecimal.getNumberOfDecimalPositions();
                    c += as400ZoneDecimal.getNumberOfDigits();
                }else{
                    c += rs[i].getByteLength();
                }
            }
        }
        return c;
    }

    public AS400Array Occurs(AS400DataType dt, int size) {
        return new AS400Array(dt, size);
    }
    
    public int getOccursSize(AS400DataType dt){
        return ((AS400Array)dt).getNumberOfElements();
    }
    
    public String getString(Object o){
        return (String)o;
    }
    
    public int getInt(Object o){
        return ((BigDecimal)o).intValue();
    }
    
    public double getDouble(Object o){
        return ((BigDecimal)o).doubleValue();
    }
}
