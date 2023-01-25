/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.utils;

// <editor-fold defaultstate="collapsed" desc="{...} Java Imports">
import java.net.InetAddress;
import java.net.UnknownHostException;
// </editor-fold>

/**
 *
 * @author rmayta
 */
public class WorkStation {

    // <editor-fold defaultstate="collapsed" desc="{...} Set Attributes and Vars">
    GeneralLog generalLog = GeneralLog.getInstance();

    private static WorkStation workstationInstance;
    private static boolean instantiated = false;

    private static String HOST_ADDRESS;

    private static String allUsersProfile;
    private static String computerName;
    private static String userDnsDomain;
    private static String userDomain;
    private static String userName;
    private static String userProfile;

    private int mousePositionX, mousePositionY;
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="{...} Singleton Pattern">
    private WorkStation(){
        initProgram();
    }

    public static WorkStation getInstance(){
        if(instantiated == false){
            workstationInstance = new WorkStation();
            instantiated = true;
        }
        return workstationInstance;
    }
    // </editor-fold>

    private void initProgram(){

        allUsersProfile = System.getenv("ALLUSERSPROFILE");
        computerName    = System.getenv("COMPUTERNAME");
        userDnsDomain   = System.getenv("USERDNSDOMAIN");
        userDomain      = System.getenv("USERDOMAIN");
        userName        = System.getenv("USERNAME");
        userProfile     = System.getenv("USERPROFILE");

        mousePositionX = 0;
        mousePositionY = 0;

        try{
            HOST_ADDRESS = InetAddress.getLocalHost().getHostAddress();
        }catch(UnknownHostException e){
            generalLog.add(e.getMessage());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="{...} Java Beans ::: Setters">
    public void setMousePositionX(int pValue){
        mousePositionX = pValue;
    }

    public void setMousePositionY(int pValue){
        mousePositionY = pValue;
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="{...} Java Beans ::: Getters">
    public String getHostAddress(){
        return HOST_ADDRESS;
    }

    public static String getAllUsersProfile(){
        return allUsersProfile;
    }

    public static String getComputerName(){
        return computerName;
    }

    public static String getUserDnsDomain(){
        return userDnsDomain;
    }

    public static String getUserDomian(){
        return userDomain;
    }

    public static String getUserName(){
        return userName;
    }

    public static String getUserProfile(){
        return userProfile;
    }

    public int getMousePositionX(){
        return mousePositionX;
    }

    public int getMousePositionY(){
        return mousePositionY;
    }
    // </editor-fold>

}
