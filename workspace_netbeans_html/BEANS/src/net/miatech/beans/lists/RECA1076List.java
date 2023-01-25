package net.miatech.beans.lists;

import net.miatech.beans.RECA1076;
import java.util.*;
import java.io.*;


public class RECA1076List extends ArrayList implements Serializable{
    
    RECA1076 RECA1076Filter=null;
    
    public RECA1076List(){
        RECA1076Filter = new RECA1076();
    }
    
    public RECA1076 getRECA1076(int i){
        return (RECA1076) get(i);
    }
    
    public RECA1076 getRECA1076Filter(){
        return RECA1076Filter;
    }
    
    public void setRECA1076Filter(RECA1076 RECA1076Filter){
        this.RECA1076Filter = RECA1076Filter;
    }
    
    
}
