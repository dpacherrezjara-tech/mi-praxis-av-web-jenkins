package net.miatech.praxis.classes;

import java.sql.SQLException;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.core.simple.SimpleJdbcCallOperations;

/**
 *
 * @author Dvicente
 */
public class CustomJdbcTemplate extends JdbcTemplate {

    public CustomJdbcTemplate(DataSource dataSource) {
        super(dataSource);
    }

    public Map<String, Object> executeWithParams(SimpleJdbcCallOperations simpleJdbcCall, SqlParameterSource in) {
        try {
            // Lógica antes de la ejecución, si es necesario
            System.out.println("Executing stored procedure...");

            // Ejecutar la llamada
            Map<String, Object> result = simpleJdbcCall.execute(in);

            return result;
        } finally {
            // Cerrar la conexión después de la ejecución
            if (simpleJdbcCall instanceof SimpleJdbcCall) {
                DataSource dataSource = getDataSource();
                if (dataSource != null) {
                    try {
                        System.out.println("Close connection for Data Base IBM Power System AS400 DB2...");
                        dataSource.getConnection().close();
                    } catch (SQLException e) {
                        e.printStackTrace(); // Manejar excepciones adecuadamente
                    }
                }
            }
        }
    }

    public Map<String, Object> executeWithoutParams(SimpleJdbcCallOperations simpleJdbcCall) {
        try {
            // Lógica antes de la ejecución, si es necesario
            System.out.println("Executing stored procedure...");

            // Ejecutar la llamada
            Map<String, Object> result = simpleJdbcCall.execute();

            return result;
        } finally {
            // Cerrar la conexión después de la ejecución
            if (simpleJdbcCall instanceof SimpleJdbcCall) {
                DataSource dataSource = getDataSource();
                if (dataSource != null) {
                    try {
                        System.out.println("Close connection for Data Base IBM Power System AS400 DB2...");
                        dataSource.getConnection().close();
                    } catch (SQLException e) {
                        e.printStackTrace(); // Manejar excepciones adecuadamente
                    }
                }
            }
        }
    }

    public Map<String, Object> executeWithParamsWLog(SimpleJdbcCallOperations simpleJdbcCall, SqlParameterSource in) {
        try {
            // Ejecutar la llamada
            Map<String, Object> result = simpleJdbcCall.execute(in);
            return result;
        } finally {
            // Cerrar la conexión después de la ejecución
            if (simpleJdbcCall instanceof SimpleJdbcCall) {
                DataSource dataSource = getDataSource();
                if (dataSource != null) {
                    try {
                        dataSource.getConnection().close();
                    } catch (SQLException e) {
                        e.printStackTrace(); // Manejar excepciones adecuadamente
                    }
                }
            }
        }
    }

}
