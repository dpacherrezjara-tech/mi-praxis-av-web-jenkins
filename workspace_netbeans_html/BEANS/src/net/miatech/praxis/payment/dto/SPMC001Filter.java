package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class SPMC001Filter {
    List<?> procesadores = new ArrayList<>();
    List<?> cias = new ArrayList<>();
}
