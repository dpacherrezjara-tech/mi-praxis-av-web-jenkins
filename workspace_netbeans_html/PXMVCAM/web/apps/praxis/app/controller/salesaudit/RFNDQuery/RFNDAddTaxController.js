/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.RFNDAddTaxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDAddTaxController',
    init: function (view) {
        var me = this;
        //console.log(this.view.params.vl_mda); 
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {

    },
    onClickAdd: function () {
        var grid01 = Ext.getCmp(prototype.id2 + '-gridTaxes');
        var regs = grid01.getStore().getCount();
        var beanDatos = {};
        if (Ext.getCmp(prototype.id3 + '-txttax').getValue() === '') {
            Ext.MessageBox.alert('.: PRAXIS :.', 'You must enter the tax code', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id3 + '-txttax').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.id3 + '-txttaxamount').getValue() === 0 || Ext.getCmp(prototype.id3 + '-txttaxamount').getValue() === '0.00') {
            Ext.MessageBox.alert('.: PRAXIS :.', 'You must enter the amount of the tax', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id3 + '-txttaxamount').focus();", 100);
            });
            return;
        }
        beanDatos.A3652CDTAX = Ext.getCmp(prototype.id3 + '-txttax').getValue();
        beanDatos.A3652TXDIF = Ext.getCmp(prototype.id3 + '-txttaxamount').getValue();
        beanDatos.A3652TXDIF = Ext.getCmp(prototype.id3 + '-txttaxamount').getValue();
        beanDatos.A3652MONED =  Ext.getCmp(prototype.id2 + '-txtmda').getValue(); ;
        grid01.getStore().add(beanDatos);
        Ext.getCmp(prototype.id2 + '-win').getController().onSumaTaxGrid();
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onAmountRenderer: function (field, newValue, oldValue) {
        field.setValue(Ext.util.Format.number(newValue, '0,000.00'));
    },
    onClickCancel: function (btn) {
        this.view.close();
    }

});