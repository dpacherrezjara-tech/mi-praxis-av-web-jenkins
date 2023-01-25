
package net.miatech.beans.lists;

import java.util.*;
import java.io.*;
import net.miatech.beans.A1200;

/**
 *
 * @author  claudia
 */
public class A1200List extends ArrayList implements Serializable {
    A1200 A1200Filter = null;
    /**
     * Creates a new instance of A1200List
     */
    public A1200List() {
        A1200Filter = new A1200();
    }

    public A1200 getA1200(int i){
        return (A1200) get(i);
    }
        
    public A1200 getA1200Filter() {
        return A1200Filter;
    }
    
    public void setA1200Filter(A1200 A1200Filter) {
        this.A1200Filter = A1200Filter;
    }
    
}
