/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.RatesExchange.DataEntryRatesExchangeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/RatesExchange',
    action: '',
    panelActual: prototype.id + '-panel01',
    txtRateDateOld: '',
    txtCurrFromOld: '',
    txtCurrToOld: '',
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {

        var p = this.view.params;
        action = p.action;

        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
//
                this.view.setHeight(this.view.getHeight());
                break;
        }
        this.txtRateDateOld = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtRateDate').getValue(), 'Ymd');
        this.txtCurrFromOld = Ext.getCmp(prototype.id + '-txtCurrFrom').getValue();
        this.txtCurrToOld = Ext.getCmp(prototype.id + '-txtCurrTo').getValue();
        global.AccessControlMaganer();
    }
    ,
    onTabChange: function(tabPanel, newTab, oldTab) {
        console.log("Cambio de panel : ");
        console.log(newTab.id);
        this.panelActual = newTab.id;
        if (newTab.id === prototype.id + 'panel2') {
            Ext.getCmp(prototype.id + '-btn-save').hide();
            Ext.getCmp(prototype.id + '-btn-update').show();
            Ext.getCmp(prototype.id + '-btn-delete').hide();
        } else {

            switch (action) {
                case 'I':
                    Ext.getCmp(prototype.id + '-btn-save').show();
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                    Ext.getCmp(prototype.id + '-btn-delete').hide();
                    break;
                case 'U':
                    Ext.getCmp(prototype.id + '-btn-save').hide();
                    Ext.getCmp(prototype.id + '-btn-update').show();
                    Ext.getCmp(prototype.id + '-btn-delete').show();
            }
        }
    }
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    ,
    onClearInputs: function() {

    }
    , getDataInputs: function() {
        var p = this.view.params;
        var rec = p.rec;

        Ext.getCmp(prototype.id + '-txtRateDate').setValue(rec.get('A1526DIS'));
        Ext.getCmp(prototype.id + '-txtCurrFrom').setValue(rec.get('A1526CUR'));
        Ext.getCmp(prototype.id + '-txtCurrTo').setValue(rec.get('A1526CUR2'));
        Ext.getCmp(prototype.id + '-txtRateValue').setValue(rec.get('A1526RATE'));
        Ext.getCmp(prototype.id + '-txtUSCR').setValue(rec.get('A1526UCRE'));
        Ext.getCmp(prototype.id + '-txtFECR').setValue(rec.get('A1526DCRE'));
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(rec.get('A1526TCRE'));
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(rec.get('A1526UUPD'));
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(rec.get('A1526DUPD'));
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(rec.get('A1526TUPD'));
        Ext.getCmp(prototype.id + '-txtUpdRateVal').setValue(rec.get('A1526RATE'));


    },
    validateForm: function() {
        var msg = "";
        var txtRateDate = Ext.getCmp(prototype.id + '-txtRateDate').getValue();
        var txtCurrFrom = Ext.getCmp(prototype.id + '-txtCurrFrom').getValue();
        var txtCurrTo = Ext.getCmp(prototype.id + '-txtCurrTo').getValue();
        var txtRateValue = Ext.getCmp(prototype.id + '-txtRateValue').getValue();

        if (txtRateDate === null) {
            msg = 'Insert fields required.';
        } else {
            if (!Ext.getCmp(prototype.id + '-txtRateDate').isValid()) {
                msg = 'Insert fields required.';
            }
        }

        if (txtCurrFrom.trim() === '' || txtCurrTo.trim() === '' || txtRateValue.trim() === '') {
            msg = 'Insert fields required.';
        } else {
            if (txtCurrFrom.trim() === txtCurrTo.trim() === '') {
                msg = 'The currencies must be different.';
            }
        }

        return msg;

    },
    getDataEntryValues: function(strOption) {

        var txtRateDate =  Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtRateDate').getValue(), 'Ymd');
        var txtCurrFrom = Ext.getCmp(prototype.id + '-txtCurrFrom').getValue();
        var txtCurrTo = Ext.getCmp(prototype.id + '-txtCurrTo').getValue();
        var txtRateValue = Ext.getCmp(prototype.id + '-txtRateValue').getValue();

        return {
            strOption: strOption,
            A1526RATE: txtRateValue,
            IN_A1526CUR: txtCurrFrom,
            IN_A1526CUR2: txtCurrTo,
            IN_A1526DIS: txtRateDate,
            IN_A1526CUR_OLD: this.txtCurrFromOld,
            IN_A1526CUR2_OLD: this.txtCurrToOld,
            IN_A1526DIS_OLD: this.txtRateDateOld
        };

    }

    , onSaveClick: function(btn) {


        var strMsg = this.validateForm();

        if (strMsg !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function() {
        var p = this.view.params;
        var strOption = p.action;

        console.log(this.getDataEntryValues(strOption));

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
               

                global.Msg({
                    msg: msg,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpdateClick: function(btn) {
        //var p = this.view.params;
        var strMsg;

        if (this.panelActual === prototype.id + '-panel01') {

            strMsg = this.validateForm();
            if (strMsg !== '') {
                global.Msg({
                    msg: strMsg
                });
            }
            else {
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    scope: this,
                    buttons: Ext.MessageBox.YESNO,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            this.view.params.action = "U";

                            this.crud();
                        }
                    }
                });
            }

        } else {

        }



    }
    ,
    onDeleteClick: function(btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";

                    this.crud();
                }
            }
        });
    }
});


