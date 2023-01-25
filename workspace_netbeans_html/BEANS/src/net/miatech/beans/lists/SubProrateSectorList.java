/*
 * AirlineList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.SubProrateSector;
/**
 *
 * @author  mflor
 */
public class SubProrateSectorList extends ArrayList<SubProrateSector> implements Serializable {

    public SubProrateSectorList() {
    }

    public SubProrateSector getSubProrateSector(int i){
        return (SubProrateSector) get(i);
    }
            
}
