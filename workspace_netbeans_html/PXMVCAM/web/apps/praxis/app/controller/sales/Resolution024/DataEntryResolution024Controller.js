/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.Resolution024.DataEntryResolution024Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/Resolution024',
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
        console.log("URL : " + this.url);
        var p = this.view.params;
        // this.setStoreData();

        switch (p.action) {
            case 'I':
                this.onClearInputs();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').hide();

                this.view.setHeight(this.view.getHeight());
                break;
        }
        global.AccessControlMaganer();
    },
    setStoreData: function() {
//        var cmbCurrency = Ext.getCmp(prototype.id + '-cmbCurrency');
//        cmbCurrency.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["USD", "USD"],
//                ["MXN", "MXN"],
//                ["EUR", "EUR"]
//            ]}));
    }
    ,
    onUpdateClick: function(btn) {

    }
    ,
    onDeleteClick: function(btn) {
        var p = this.view.params;
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
    ,
    onSaveClick: function(btn) {

        var pais = Ext.getCmp(prototype.id + '-txtA881PAIS').getValue();
        var fecha = Ext.getCmp(prototype.id + '-txtA881FECHA').getValue();

        if (pais === '' || fecha === '') {
            global.Msg({msg: "Insert fields required"});
        }

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
    ,
    crud: function() {
        var p = this.view.params;
        rec = p.rec;

        var strOption = p.action;

        console.log('opcion : ' + strOption);

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var result = res.result;
                var icon;
                var msg = '';
                console.log(result);
                if (result === 0) {
                    msg = 'Successful operation ';
                    icon = 1;
                } else {
                    msg = 'DUPLICATED KEY, VERIY!';
                   icon = 2;
                }
                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function(strOption) {

        var A881PAIS = Ext.getCmp(prototype.id + '-txtA881PAIS').getValue();
        var nameCountry = Ext.getCmp(prototype.id + '-txtNameCountry').getValue();
        //var A881FECHA = Ext.getCmp(prototype.id + '-txtA881FECHA').getValue();
        var A881FECHA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA881FECHA').getValue(), 'Ym');
        var A881IND024 = Ext.getCmp(prototype.id + '-txtA881IND024').getValue();
        var A881MONEDA = Ext.getCmp(prototype.id + '-txtA881MONEDA').getValue();
        console.log(A881FECHA);

        return {
            strOption: strOption,
            A881PAIS: A881PAIS,
            nameCountry: nameCountry,
            A881FECHA: A881FECHA,
            A881IND024: A881IND024,
            A881MONEDA: A881MONEDA
        };
    }
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    ,
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    onClearInputs: function() {
        Ext.getCmp(prototype.id + '-txtA881PAIS').setValue('');
        Ext.getCmp(prototype.id + '-txtNameCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtA881FECHA').setValue('');
        Ext.getCmp(prototype.id + '-txtA881IND024').setValue('');
        Ext.getCmp(prototype.id + '-txtA881MONEDA').setValue('');
    }
    , getDataInputs: function() {
        var p = this.view.params;
        rec = p.rec;

        Ext.getCmp(prototype.id + '-txtA881PAIS').setValue(rec.get('A881PAIS'));
        Ext.getCmp(prototype.id + '-txtNameCountry').setValue(rec.get('strNombrePais'));
        Ext.getCmp(prototype.id + '-txtA881FECHA').setValue(rec.get('A881FECHA'));
        Ext.getCmp(prototype.id + '-txtA881IND024').setValue(rec.get('A881IND024'));
        Ext.getCmp(prototype.id + '-txtA881MONEDA').setValue(rec.get('A881MONEDA'));


        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A881REGIST'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('strFormatDate2'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A881HREGIS'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A881REVISA'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('strFormatDate2'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A881HREVIS'));

    }



});


