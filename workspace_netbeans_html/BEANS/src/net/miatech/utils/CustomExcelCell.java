package net.miatech.utils;

import java.awt.Color;
import lombok.Data;

/**
 *
 * @author dvicente
 */
@Data
public class CustomExcelCell {
    private Object value;
    private Color customStyle;

    public CustomExcelCell(Object value, Color customStyle) {
        this.value = value;
        this.customStyle = customStyle;
    }
    
    public CustomExcelCell(Object value) {
        this.value = value;
        this.customStyle = null;
    }
}
