/*
 * ProrateSectorA728List.java
 *
 * Created on 17 de mayo de 2010, 11:20 AM
 */

package net.miatech.beans.lists;

import java.io.*;
import java.util.*;
import net.miatech.beans.ProrateSectorA728;
/**
 *
 * @author  claudia
 */
public class ProrateSectorA728List extends ArrayList<ProrateSectorA728> implements Serializable {

    public ProrateSectorA728List() {
    }

    public ProrateSectorA728 getProrateSectorA728(int i){
        return (ProrateSectorA728) get(i);
    }
            
}
