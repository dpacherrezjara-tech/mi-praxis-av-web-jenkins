Ext.define('Ext.Praxis.controller.flown.Item.DataEntryItemController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryItemController',
    url: CONTEXTPATH + '/Item',
    p: {},
    dataentryParams: {},
    lblA051KEY2_OLD:'',

    init: function (view) {
    },
    afterRender: function () {
        this.p = this.view.params;
        /*this.getDataInputs(this.p.rec);
         Ext.getCmp(prototype.id+'-btn-save').hide();
         Ext.getCmp(prototype.id+'-btn-update').hide();
         Ext.getCmp(prototype.id+'-btn-delete').hide();
         Ext.getCmp(prototype.id+'-btn-cancel').show();*/


        this.p = this.view.params;
        switch (this.p.action) {
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                //Ext.getCmp(prototype.id + '-txtA1007CTATO').focus();
                break;
        }
        global.AccessControlMaganer();

    },
    getDataInputs: function (rec) {
        Ext.getCmp(prototype.id + '-txtA051KEY1').setValue(rec.get('A051KEY1'));
        Ext.getCmp(prototype.id + '-txtA051KEY2').setValue(rec.get('A051KEY2'));
        Ext.getCmp(prototype.id + '-txtA051DESCR1').setValue(rec.get('A051DESCR1'));
        Ext.getCmp(prototype.id + '-txtA051DESCR2').setValue(rec.get('A051DESCR2'));
        Ext.getCmp(prototype.id + '-txtA051CANTI1').setValue(Ext.util.Format.number(rec.get('A051CANTI1'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA051CANTI2').setValue(Ext.util.Format.number(rec.get('A051CANTI2'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA051FECHA1').setValue(rec.get('A051FECHA1'));
        Ext.getCmp(prototype.id + '-txtA051FECHA2').setValue(rec.get('A051FECHA2'));
        Ext.getCmp(prototype.id + '-txtA051COMENT').setValue(rec.get('A051COMENT'));
        Ext.getCmp(prototype.id + '-txtA051STATUS').setValue(rec.get('A051STATUS'));
        this.lblA051KEY2_OLD = rec.get('A051KEY2');
        
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    onSaveClick: function (btn) {

        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {
        var p = this.view.params;
        var strOption = p.action;
        console.log(this.getDataEntryValues(strOption));

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;


                global.Msg({
                    msg: msg,
                    icon: 1,
                    fn: function () {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpdateClick: function (btn) {


        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";

                        this.crud();
                    }
                }
            });
        }
    }
    ,
    onDeleteClick: function (btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";

                    this.crud();
                }
            }
        });
    },
    validateForm: function () {
        var mensaje = "";
        var txtA051KEY2 = Ext.getCmp(prototype.id + '-txtA051KEY2').getValue();
        var txtA051DESCR1 = Ext.getCmp(prototype.id + '-txtA051DESCR1').getValue();
        var txtA051DESCR2 = Ext.getCmp(prototype.id + '-txtA051DESCR2').getValue();
        var txtA051FECHA1 = Ext.getCmp(prototype.id + '-txtA051FECHA1').getValue();
        var txtA051FECHA2 = Ext.getCmp(prototype.id + '-txtA051FECHA2').getValue();
        

        if (txtA051KEY2 === '' || txtA051DESCR1 === '' || txtA051DESCR2 === '' || txtA051FECHA1 === '' || txtA051FECHA2 === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;

    },
    getDataEntryValues: function(strOption) {

        var A051KEY1 = "II"; // Ext.getCmp(prototype.id + '-txtA051KEY1').getValue();
        var A051KEY2 = Ext.getCmp(prototype.id + '-txtA051KEY2').getValue();
        var A051DESCR1 = Ext.getCmp(prototype.id + '-txtA051DESCR1').getValue();
        var A051DESCR2 = Ext.getCmp(prototype.id + '-txtA051DESCR2').getValue();
        var A051FECHA1 = Ext.getCmp(prototype.id + '-txtA051FECHA1').getValue();
        var A051FECHA2 = Ext.getCmp(prototype.id + '-txtA051FECHA2').getValue();       
        //var A1830FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtStartDate').getValue(), 'Ymd');
        //var A1830FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtEndDate').getValue(), 'Ymd');       
        var IN_A051KEY2_OLD = this.lblA051KEY2_OLD;

        if (A051FECHA1 === '') {
            A051FECHA1 = '99999999';
        } 
        if (A051FECHA2 === '') {
            A051FECHA2 = '99999999';
        }      
        return {
            strOption: strOption,
            A051KEY1: A051KEY1,
            A051KEY2: A051KEY2,
            A051DESCR1: A051DESCR1,
            A051DESCR2: A051DESCR2,
            A051FECHA1: A051FECHA1,
            A051FECHA2: A051FECHA2,
            IN_A051KEY2_OLD: IN_A051KEY2_OLD
        };
    }
});