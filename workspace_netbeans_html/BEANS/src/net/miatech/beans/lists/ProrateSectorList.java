/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.ProrateSector;
/**
 *
 * @author  mflor
 */
public class ProrateSectorList extends ArrayList<ProrateSector> implements Serializable {

    public ProrateSectorList() {
    }

    public ProrateSector getProrateSector(int i){
        return (ProrateSector) get(i);
    }
            
}
