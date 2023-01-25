/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.controller.sales.AccountingTaxdetailForm.DataEntryAccountingTaxdetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idDataEntryAccountingTax + '-DataEntryAccountingTaxdetailController',
    url: CONTEXTPATH + '/AccountingTaxdetailForm',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var p = this.view.params;
        this.getDataInputs();



    },
    getDataInputs: function () {

        Ext.getCmp(prototype.idDataEntryAccountingTax + '-txtCorreoPri').setValue('rcaballero@aeromexico.com');
        Ext.getCmp(prototype.idDataEntryAccountingTax + '-txtCorreoCopi').setValue('');

    },
    getDataEntryValues: function () {
        var p = this.view.params;
        var data = p.searchParams;
        var CorreoPri = Ext.getCmp(prototype.idDataEntryAccountingTax + '-txtCorreoPri').getValue();
        var CorreoCopi = Ext.getCmp(prototype.idDataEntryAccountingTax + '-txtCorreoCopi').getValue();
        return {
            CorreoPri: CorreoPri,
            CorreoCopi: CorreoCopi,
            Opcion: data.Opcion,
            SALES: data.SALES,
            BANK: data.BANK,
            Tax: data.Tax,
            CONTABLE: data.CONTABLE,
            GRUPO: data.GRUPO,
            DateFrom: data.DateFrom,
            DateTo: data.DateTo,
            COUNTRY: data.COUNTRY,
            CHANNEL: data.CHANNEL,
            IATA: data.IATA,
            Currency: data.Currency,
            COUNTRYTAX: data.COUNTRYTAX
        };
    },
    onSaveClick: function (btn) {


        if (Ext.getCmp(prototype.idDataEntryAccountingTax + '-txtCorreoPri').getValue().trim() === '') {
            global.Msg({
                msg: 'You must enter at least one email.'
            });
        } else {
            global.Msg({
                msg: 'Option not Available'
            });

            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Send report to the mail?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: this.url + '/sendReport',
                            method: 'POST',
                            timeout: 60000000,
                            params: this.getDataEntryValues(),
                            beforerequest: Ext.getCmp(prototype.idDataEntryAccountingTax + '-DataEntry-center').mask('Loading...', ''),
                            success: function (response, options) {
                                var res = Ext.JSON.decode(response.responseText);
                                Ext.getCmp(prototype.idDataEntryAccountingTax + '-DataEntry-center').unmask('Loading...', '');
                                global.Msg({
                                    msg: res.data,
                                    icon: 1,
                                    fn: function () {
                                        //exito
                                        Ext.getCmp(prototype.idDataEntryAccountingTax + '-DataEntry-center').close();
                                    }
                                });
                            }
                        });

                    }
                }
            });
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCancelClick: function (btn) {
        this.view.close();
    }
});




