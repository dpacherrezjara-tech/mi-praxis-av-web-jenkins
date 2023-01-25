/*
 * AirlineList.java
 *
 * Created on 05 de Febrero de 2010, 18:16 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import net.miatech.beans.*;
import java.io.*;
/**
 *
 * @author  claudia
 */
public class AirlineList extends ArrayList implements Serializable {
    Airline AirlineFilter = null;
    /**
     * Creates a new instance of AirlineList
     */
    public AirlineList() {
        AirlineFilter = new Airline();
    }

    public Airline getAirline(int i) {
        return (Airline) get(i);
    }

    public Airline getAirlineFilter() {
        return AirlineFilter;
    }
    
    public void setAirlineFilter(Airline AirlineFilter) {
        this.AirlineFilter = AirlineFilter;
    }
    
}
