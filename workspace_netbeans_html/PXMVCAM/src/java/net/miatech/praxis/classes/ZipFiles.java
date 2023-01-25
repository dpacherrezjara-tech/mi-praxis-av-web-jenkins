/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.classes;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ctarazona
 */
public class ZipFiles {
        public void zipFiles(List<File> srcfile, File zipfile) {
        byte[] buf = new byte[1024];
        try {
            // Create the ZIP file  
            ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipfile));
            // Compress the files  
            for (int i = 0; i < srcfile.size(); i++) {
                File file = srcfile.get(i);
                FileInputStream in = new FileInputStream(file);
                // Add ZIP entry to output stream.  
                out.putNextEntry(new ZipEntry(file.getName()));
                // Transfer bytes from the file to the ZIP file  
                int len;
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }
                // Complete the entry  
                out.closeEntry();
                in.close();
            }
            // Complete the ZIP file  
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void downFile(HttpServletResponse response, String serverPath, String str) {
        try {
            String path = serverPath + str;
            File file = new File(path);
            if (file.exists()) {
                InputStream ins = new FileInputStream(path);
                BufferedInputStream bins = new BufferedInputStream(ins);// put in the buffer stream  
                OutputStream outs = response.getOutputStream();// Get the file output IO stream  
                BufferedOutputStream bouts = new BufferedOutputStream(outs);
                response.setContentType("application/x-download");// Set the type of response content  
                response.setHeader(
                        "Content-disposition",
                        "attachment;filename="
                        + URLEncoder.encode(str, "GBK"));// Set header information  
                int bytesRead = 0;
                byte[] buffer = new byte[8192];
                //Start to transfer file streams to the network  
                while ((bytesRead = bins.read(buffer, 0, 8192)) != -1) {
                    bouts.write(buffer, 0, bytesRead);
                }
                bouts.flush();// You must call the flush() method here.  
                ins.close();
                bins.close();
                outs.close();
                bouts.close();
            } else {
                response.sendRedirect("../error.jsp");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
