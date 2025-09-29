package net.miatech.praxis.classes;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@WebServlet("/downloadCsvZip")
public class DownloadCsvZipServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Leer body como texto plano
        String body = request.getReader().lines().reduce("", (a, b) -> a + b);

        // ⚠️ Parseo ultra simple: buscar pares "name":"..." y "content":"..."
        // (Esto solo funciona si el JSON viene con el formato esperado)
        String[] parts = body.split("\\{");
        
        // Carpeta temporal
        File tempDir = Files.createTempDirectory("csv_uploads").toFile();

        for (String part : parts) {
            if (part.contains("\"name\"") && part.contains("\"content\"")) {
                String name = extraerValor(part, "name");
                String content = extraerValor(part, "content");

                // Decodificar base64 y guardar archivo
                byte[] data = Base64.getDecoder().decode(content);
                File file = new File(tempDir, name);
                Files.write(file.toPath(), data);
            }
        }

        // Crear ZIP
        File zipFile = new File(tempDir.getParent(), "archivos.zip");
        try (FileOutputStream fos = new FileOutputStream(zipFile);
             ZipOutputStream zos = new ZipOutputStream(fos)) {

            for (File f : tempDir.listFiles()) {
                ZipEntry entry = new ZipEntry(f.getName());
                zos.putNextEntry(entry);
                Files.copy(f.toPath(), zos);
                zos.closeEntry();
            }
        }

        // Responder ZIP
        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=archivos.zip");
        Files.copy(zipFile.toPath(), response.getOutputStream());
        response.getOutputStream().flush();
    }

    // Método auxiliar para sacar el valor de un campo del JSON string
    private String extraerValor(String jsonPart, String key) {
        int idx = jsonPart.indexOf("\"" + key + "\"");
        if (idx == -1) return "";
        int start = jsonPart.indexOf(":", idx) + 1;
        int firstQuote = jsonPart.indexOf("\"", start) + 1;
        int secondQuote = jsonPart.indexOf("\"", firstQuote);
        return jsonPart.substring(firstQuote, secondQuote);
    }
}
