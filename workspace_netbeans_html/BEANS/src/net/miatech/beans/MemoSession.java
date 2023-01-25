/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public class MemoSession {
    
    private static MemoSession memoSessionInstance;
    private static boolean instantiated = false;
    
    private MemoSession(){
        
    }
    
    public static MemoSession getInstance(){
        if(instantiated == false){
            memoSessionInstance = new MemoSession();
            instantiated = true;
        }
        return memoSessionInstance;
    }
    
    public ConnectionIBMDB2Server CNXIBMDB2;
    public boolean ACCCNX;
    public String user;
    public UserView USER_VIEW;
    public String MAIN_LIBRARY;
}
