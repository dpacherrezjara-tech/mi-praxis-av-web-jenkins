package net.miatech.praxis.payment.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class MPF121Filter extends MPF121{
    private String PROC_NAME,AIRLINE_NAME,PLACA;
}
