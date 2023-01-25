package net.miatech.dao;
import java.sql.*;
import java.util.*;
import net.miatech.provider.Proveedor;
/**
 *
 * @author  Ronald Ramirez
 * @version 1.1a
 */
public class ConnectionPoolIS implements Runnable {
    private String driver, url, username, password;
    private int maxConnections;
    private boolean waitIfBusy;
    private Vector<Connection> availableConnections, busyConnections;
    private boolean connectionPending = false;
    
    static ConnectionPoolIS pool = null;
    
    public static ConnectionPoolIS getConnectionPool(){
        if(pool == null){
            try{
                pool = new ConnectionPoolIS();
            }catch (Exception e){
                System.out.println("The system can't create the IS Pool...");
            }
        }
        return pool;
    }
    
    public ConnectionPoolIS()throws SQLException {
        ResourceBundle rb = ResourceBundle.getBundle("net.miatech.cm.resource.pool");
        
        this.maxConnections = Integer.parseInt(rb.getString("IS_maximum"));
        this.waitIfBusy = true;
        int initialConnections = Integer.parseInt(rb.getString("IS_initial"));
        if (initialConnections > maxConnections) {
            initialConnections = maxConnections;
        }
        availableConnections = new Vector<Connection>(initialConnections);
        busyConnections = new Vector<Connection>();
        for(int i=0; i<initialConnections; i++) {
            availableConnections.addElement(Proveedor.getConnectionIS());
        }
    }
    
    public synchronized Connection getConnection()throws SQLException {
        if (!availableConnections.isEmpty()) {
            Connection existingConnection =(Connection)availableConnections.lastElement();
            int lastIndex = availableConnections.size() - 1;
            availableConnections.removeElementAt(lastIndex);
            
            if (existingConnection.isClosed()) {
                notifyAll(); // Freed up a spot for anybody waiting
                return(getConnection());
            }else{
                busyConnections.addElement(existingConnection);
                return(existingConnection);
            }
        }else{
            if ((totalConnections() < maxConnections) &&!connectionPending) {
                makeBackgroundConnection();
            }else
                if (!waitIfBusy) {
                    throw new SQLException("Connection limit reached");
                }
            try {
                wait();
            }catch(InterruptedException ie) {}
            return(getConnection());
        }
    }
    
    
    private void makeBackgroundConnection() {
        connectionPending = true;
        try {
            Thread connectThread = new Thread(this);
            connectThread.start();
        }
        catch(OutOfMemoryError oome) {}
    }
    
    public void run() {
        try {
            Connection connection = Proveedor.getConnectionIS();
            synchronized(this) {
                availableConnections.addElement(connection);
                connectionPending = false;
                notifyAll();
            }
        }
        catch(Exception e) {}
    }
       
    public synchronized void free(Connection connection) {
        if(busyConnections.removeElement(connection)){
            availableConnections.addElement(connection);
        }
        else
            System.out.println("*-*-*-*-*-No encontro a la conexion IS TW dentro de los busyConnection ");
        notifyAll();
    }
    
    public synchronized int totalConnections() {
        return(availableConnections.size() +
        busyConnections.size()); 
    }
    
    public synchronized void closeAllConnections() {
        closeConnections(availableConnections);
        availableConnections = new Vector<Connection>();
        closeConnections(busyConnections);
        busyConnections = new Vector<Connection>();
    }
    
    private void closeConnections(Vector connections) {
        try {
            for(int i=0; i<connections.size(); i++) {
                Connection connection =(Connection)connections.elementAt(i);
                if (!connection.isClosed()) {
                    connection.close();
                }
            }
        } catch(SQLException sqle) {}
    }
    
    public synchronized String toString() {
        String info =  "ConnectionPool(".concat(url).concat(",").concat(username)
                .concat(")").concat(", available=").concat(String.valueOf(availableConnections.size()))
                .concat(", busy=").concat(String.valueOf(busyConnections.size()))
                .concat(", max=").concat(String.valueOf(maxConnections));
        return(info);
    }
}
