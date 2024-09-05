package net.miatech.praxis.payment.dto;

import lombok.Builder;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
@Builder
public class CalendarPhase2 {
    public String procesador;
    public String fecha;
    public String status;
    public String dayName;
}
