package net.miatech.praxis.payment.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.miatech.praxis.payment.entities.MPF091;
import net.miatech.utils.CustomPageImpl;

/**
 *
 * @author dvicente
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SPACR016Filter extends CustomPageImpl{
    private String IN_BANDOC,IN_DATECI,IN_TRANCI;
    List<MPF091> response = new ArrayList<>();
}
