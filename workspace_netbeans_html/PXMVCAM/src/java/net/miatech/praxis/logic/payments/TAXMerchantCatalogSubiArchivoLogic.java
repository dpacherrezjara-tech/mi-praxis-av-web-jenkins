/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.logic.payments;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.payments.TAXMerchantCatalogSubiArchivoDAO;
import net.miatech.praxis.payment.TAXMerchantCatalogRow;

/**
 * CSR 1715 - Creacion y actualizacion masiva catalogo TAX.
 */
public class TAXMerchantCatalogSubiArchivoLogic {

    private final TAXMerchantCatalogSubiArchivoDAO dao = new TAXMerchantCatalogSubiArchivoDAO();

    public void setSession(IServerSession ss) {
        dao.setSession(ss);
    }

    public Set<String> loadExistingKeys() throws SQLException, Exception {
        return dao.loadExistingKeys();
    }

    /**
     * Compara la llave de cada fila contra las llaves ya existentes en
     * MPF154 y resuelve ACTION ('C'/'U') o agrega el error correspondiente
     * segun el modo elegido por el usuario en el modal de carga.
     *
     * mode: 'C' (Crear) o 'U' (Actualizar) - elegido explicitamente por el
     * usuario antes de cargar el archivo (CSR 1715).
     */
    public void resolveActionAgainstDatabase(List<TAXMerchantCatalogRow> rows, String mode) throws SQLException, Exception {
        Set<String> existingKeys = loadExistingKeys();
        for (TAXMerchantCatalogRow row : rows) {
            if (!row.VALID) {
                continue;
            }
            String key = TAXMerchantCatalogSubiArchivoDAO.buildKey(row.PROCESO, row.MERCHANT, row.SALE_AGENT, row.PROCESSOR, row.CODE);
            boolean exists = existingKeys.contains(key);
            if ("C".equals(mode)) {
                if (exists) {
                    row.addError("The key (Process+Merchant+Agent+Processor+Code) already exists. Use Update mode or fix the row.");
                } else {
                    row.ACTION = "C";
                }
            } else {
                if (!exists) {
                    row.addError("The key (Process+Merchant+Agent+Processor+Code) does not exist in the catalog. Use Create mode or fix the row.");
                } else {
                    row.ACTION = "U";
                }
            }
        }
    }

    /**
     * Inserta/actualiza cada fila valida. Se asume que el archivo ya paso
     * por resolveActionAgainstDatabase justo antes (misma peticion), por lo
     * que todo lo que llegue aqui marcado VALID=true deberia procesar sin
     * error; si alguna fila falla (p.ej. carrera con otro usuario) se detiene
     * la fila afectada y se reporta, sin abortar el resto del archivo.
     */
    public void processRows(List<TAXMerchantCatalogRow> rows) throws SQLException, Exception {
        for (TAXMerchantCatalogRow row : rows) {
            if (!row.VALID) {
                continue;
            }
            try {
                if ("C".equals(row.ACTION)) {
                    dao.insertRow(row);
                } else {
                    dao.updateRow(row);
                }
            } catch (Exception e) {
                row.addError("Error processing in database: " + e.getMessage());
            }
        }
    }
}
