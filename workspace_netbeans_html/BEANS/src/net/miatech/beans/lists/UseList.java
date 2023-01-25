/*
 * UseList.java
 *
 * Created on 30 de septiembre de 2005, 06:12 PM
 */

package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.Use;
/**
 *
 * @author  claudia
 */
public class UseList extends ArrayList implements Serializable {
    Use UseFilter = null;
    /**
     * Creates a new instance of UseList
     */
    public UseList() {
        UseFilter = new Use();
    }

    public Use getUse(int i){
        return (Use) get(i);
    }
        
    public Use getUseFilter() {
        return UseFilter;
    }
    
    public void setUseFilter(Use UseFilter) {
        this.UseFilter = UseFilter;
    }
    
}
