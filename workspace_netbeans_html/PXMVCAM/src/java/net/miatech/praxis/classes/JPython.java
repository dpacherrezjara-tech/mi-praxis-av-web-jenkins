/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeoutException;
import net.miatech.praxis.exceptions.SpringException;
/**
 *
 * @author lremicio
 */
public class JPython {
    private String pathBase = "";
    private String pathProgram = "";
    private String programName = "";
    private String params = "";
    private HashMap response;
    private boolean async = false;

    public JPython(String _pathBase, String _pathProgram, String _programName, String _params, boolean _async) {
        this.pathBase = _pathBase;
        this.pathProgram = _pathProgram;
        this.programName = _programName;
        this.params = _params;
        this.async = _async;
    }

    public void process() throws Exception, IOException, InterruptedException {
        String strPython = "";
        try {
            String strExe = "C:\\Python27\\python.exe ";
            
            if (!this.async){
                strPython = strExe + this.pathBase + "\\" + this.pathProgram + "\\" + this.programName + " \"" + this.params+"\" ";
                Process bash = Runtime.getRuntime().exec(strPython);
                this.response = executeCommand(strPython);
            }else{
                List<String> params = new ArrayList();
                params.add(strExe.trim());
                params.add(this.pathBase + "\\" + this.pathProgram + "\\" + this.programName);
                String parts[];
                parts = this.params.split(" ");
                for(int vi = 0; vi < parts.length; ++vi){
                    params.add(parts[vi]);
                }
                this.response = executeCommandLine(params);
            }

        } catch (InterruptedException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            sw.toString();
            PrintWriter write = new PrintWriter("C:\\\\files_python\\TempoLog.log", "UTF-8");
            write.println(strPython);
            write.println("Message: " + e.getMessage() == null ? "None" : e.getMessage() + " - InterruptedException: " + sw.toString());
            write.close();
            throw new SpringException(e);
        } catch (IOException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            sw.toString();
            PrintWriter write = new PrintWriter("C:\\\\files_python\\TempoLog.log", "UTF-8");
            write.println(strPython);
            write.println("Message: " + e.getMessage() == null ? "None" : e.getMessage() + " - IOException: " + sw.toString());
            write.close();
            throw new SpringException(e);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            sw.toString();
            PrintWriter write = new PrintWriter("C:\\\\files_python\\TempoLog.log", "UTF-8");
            write.println(strPython);
            write.println("Message: " + e.getMessage() == null ? "None" : e.getMessage() + " - Exception: " + sw.toString());
            write.close();
            throw new SpringException(e);
        }

    }
    
    public HashMap executeCommand(String commandLine) throws IOException, InterruptedException, TimeoutException{
        Runtime runtime = Runtime.getRuntime();
        Process bash = runtime.exec(commandLine);
        bash.destroy();
        HashMap response = new HashMap();
        response.put("MESSAGE", "");
        response.put("ERRORCODE", "0");
        response.put("OTHERS", "");
        return response;
    }
    
    public static HashMap executeCommandLine(final List<String> params) throws IOException, InterruptedException, TimeoutException {
        ProcessBuilder pb = new ProcessBuilder(params);
        Process bash = pb.start();
        bash.waitFor();
        
        InputStream inputstream = bash.getInputStream();
        BufferedReader in = new BufferedReader(new InputStreamReader(inputstream));
        String line = null;
        Integer vi = 0;
        HashMap response = new HashMap();
        while ((line = in.readLine()) != null) {
            switch (vi) {
                case 0:
                    response.put("MESSAGE", line.trim());
                    break;
                case 1:
                    response.put("ERRORCODE", line.trim());
                    break;
                case 2:
                    response.put("OTHERS", line.trim());
                    break;
            }
            ++vi;
        }
        bash.destroy();
        return response;
    }

    public HashMap getResponse() {
        return response;
    }

    public void setResponse(HashMap response) {
        this.response = response;
    }
}
