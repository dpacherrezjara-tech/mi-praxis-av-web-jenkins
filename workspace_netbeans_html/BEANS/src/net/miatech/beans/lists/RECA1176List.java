package net.miatech.beans.lists;

import net.miatech.beans.RECA1176;
import java.util.*;
import java.io.*;


public class RECA1176List extends ArrayList implements Serializable{
    
    RECA1176 RECA1176Filter=null;
    
    public RECA1176List(){
        RECA1176Filter = new RECA1176();
    }
    
    public RECA1176 getRECA1176(int i){
        return (RECA1176) get(i);
    }
    
    public RECA1176 getRECA1176Filter(){
        return RECA1176Filter;
    }
    
    public void setRECA1176Filter(RECA1176 RECA1176Filter){
        this.RECA1176Filter = RECA1176Filter;
    }
    
    
}
