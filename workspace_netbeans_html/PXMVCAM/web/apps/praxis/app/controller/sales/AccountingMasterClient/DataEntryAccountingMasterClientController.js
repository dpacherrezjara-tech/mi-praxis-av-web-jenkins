Ext.define('Ext.Praxis.controller.sales.AccountingMasterClient.DataEntryAccountingMasterClientController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterClientController',
    lblCountryOld: '',
    lblSourceOld: '',
    lblTypeOld: '',
    lblCurrencyOld: '',
    lblSubFuOld: '',
    lblFPOld: '',
    lblIATAOld: '',
    lblCIAOld: '',
    init: function(view){
        this.cargarComboBoxes();
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-cboSource').setValue("");
                Ext.getCmp(prototype.id + '-cboCountry2').setValue("");
                Ext.getCmp(prototype.id + '-cboType2').setValue("");
                Ext.getCmp(prototype.id + '-cboCurrency2').setValue("");
                Ext.getCmp(prototype.id + '-cboFP2').setValue("");
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
//        this.setComboBoxItemData(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-cboCountry2').setValue(rec.get('A1736PAIS'));
        Ext.getCmp(prototype.id + '-cboSource').setValue(rec.get('A1736FUENT'));
        Ext.getCmp(prototype.id + '-cboType2').setValue(rec.get('A1736TIPO'));
        Ext.getCmp(prototype.id + '-cboCurrency2').setValue(rec.get('A1736CURR'));
        Ext.getCmp(prototype.id + '-cboFP2').setValue(rec.get('A1736FP'));
        
        Ext.getCmp(prototype.id + '-txtSubFu').setValue(rec.get('A1736SUBFU'));
        Ext.getCmp(prototype.id + '-txtDescription').setValue(rec.get('A1736NOMBR'));
        Ext.getCmp(prototype.id + '-txtPayment').setValue(rec.get('A1736FORPG'));
        Ext.getCmp(prototype.id + '-txtTypePayment').setValue(rec.get('A1736TIDOC'));
        Ext.getCmp(prototype.id + '-txtClient2').setValue(rec.get('A1736CLIEN'));
        Ext.getCmp(prototype.id + '-txtAddress').setValue(rec.get('A1736DIREC'));
        
        Ext.getCmp(prototype.id + '-txtCIA').setValue(rec.get('A1736CIA'));
        Ext.getCmp(prototype.id + '-txtUNIDA').setValue(rec.get('A1736UNID'));
        Ext.getCmp(prototype.id + '-txtCECOS').setValue(rec.get('A1736CECO'));
        Ext.getCmp(prototype.id + '-txtUBICA').setValue(rec.get('A1736UBI'));
        Ext.getCmp(prototype.id + '-txtCTA').setValue(rec.get('A1736CTAC'));
        Ext.getCmp(prototype.id + '-txtSCTA').setValue(rec.get('A1736SCTA'));
        Ext.getCmp(prototype.id + '-txtEQUI').setValue(rec.get('A1736EQUI'));
        Ext.getCmp(prototype.id + '-txtICIA').setValue(rec.get('A1736ICIA'));
        Ext.getCmp(prototype.id + '-txtIATA2').setValue(rec.get('A1736IATA'));
        Ext.getCmp(prototype.id + '-txtTax').setValue(rec.get('A1736TAXI'));
        
        Ext.getCmp(prototype.id + '-txtStartDate').setValue(rec.get('A1736FINI'));
        Ext.getCmp(prototype.id + '-txtEndDate').setValue(rec.get('A1736FFIN')==='9999/99/99' ? '' : rec.get('A1736FFIN'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1736REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1736FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1736HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1736REGVI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1736FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1736HREVI'));
        
        this.lblCountryOld = rec.get('A1736PAIS');
        this.lblSourceOld = rec.get('A1736FUENT');
        this.lblTypeOld = rec.get('A1736TIPO');
        this.lblCurrencyOld = rec.get('A1736CURR');
        this.lblSubFuOld = rec.get('A1736SUBFU');
        this.lblFPOld = rec.get('A1736FP');
        this.lblIATAOld = rec.get('A1736IATA');
        this.lblCIAOld = rec.get('A1736CIA');
    },
    cargarComboBoxes: function () {
        this.p = this.view.params;
        var country = new Array(), currency = new Array(), 
                type = new Array(), fp = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/loadCombo',
            method: 'POST',
            timeout: 60000000,
//            params: searchParams,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                var lstCountry = res.lstCountry;
                var lstCurrency = res.lstCurrency;
                var lstTypeCC = res.lstTypeCC;
                var lstFP = res.lstFP;
                
                country.push(['', 'Select']);
                lstCountry.forEach(function callback(currentValue, index, array) {
                    country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboCountry2').bindStore(store);
                
                currency.push(['', 'Select']);
                lstCurrency.forEach(function callback(currentValue, index, array) {
                    currency.push([currentValue.A006MONEDA, currentValue.A006MONEDA]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'currency', autoLoad: true, data: currency, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboCurrency2').bindStore(store);
                
                type.push(['', 'Select']);
                lstTypeCC.forEach(function callback(currentValue, index, array) {
                    type.push([currentValue.A051KEY2, currentValue.A051KEY2]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'type', autoLoad: true, data: type, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboType2').bindStore(store);
                
                fp.push(['', 'All']);
                lstFP.forEach(function callback(currentValue, index, array) {
                    fp.push([array[index], array[index]]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'fp', autoLoad: true, data: fp, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboFP2').bindStore(store);
            }
        });
    },
    setComboBoxItemData: function(data) {
        var index = this.getIndexData(data);
        console.log("index: " + index);
        if (index !== -1) {
            Ext.getCmp(prototype.id + '-cmbCtaType2').setValue(index);
        }
    },
    getIndexData: function(data) {
        console.info("data: " + data);
        var store = Ext.getCmp(prototype.id + '-cmbCtaType2').getStore();
        store.each(function(record,id){
            console.info(record.data.name);
            if (record.data.name === data) {
                return record.data.code;
            }
        });
        return -1;
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function() {
        var bvalida = true;
        var cboCountry2 = Ext.getCmp(prototype.id + '-cboCountry2').getValue();
        var cboCurrency2 = Ext.getCmp(prototype.id + '-cboCurrency2').getValue();
        var cboSource = Ext.getCmp(prototype.id + '-cboSource').getValue();
        var cboType2 = Ext.getCmp(prototype.id + '-cboType2').getValue();
        
        if( cboCountry2 ==="" || cboCurrency2 === "" || cboSource ===""|| cboType2 ===""){
            bvalida = false;
        }
        return bvalida;
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
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
        } else {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title:'.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn){
                    if (btn === 'yes'){
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        } else {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        }
    },
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
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;
                var icon=1;
                if(msg==='DUPLICATE KEY, VERIFY!'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryAccountingMasterClientForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var cboCountry2 = Ext.getCmp(prototype.id + '-cboCountry2').getValue();
        var cboSource = Ext.getCmp(prototype.id + '-cboSource').getValue();
        var cboType2 = Ext.getCmp(prototype.id + '-cboType2').getValue();
        var cboCurrency2 = Ext.getCmp(prototype.id + '-cboCurrency2').getValue();
        var txtDescription = Ext.getCmp(prototype.id + '-txtDescription').getValue();
        var txtPayment = Ext.getCmp(prototype.id + '-txtPayment').getValue();
        var txtTypePayment = Ext.getCmp(prototype.id + '-txtTypePayment').getValue();
        var txtClient2 = Ext.getCmp(prototype.id + '-txtClient2').getValue();
        var txtAddress = Ext.getCmp(prototype.id + '-txtAddress').getValue();
        var txtIATA2 = Ext.getCmp(prototype.id + '-txtIATA2').getValue();
        var txtTax = Ext.getCmp(prototype.id + '-txtTax').getValue();
        var txtSubFu = Ext.getCmp(prototype.id + '-txtSubFu').getValue();
        var cboFP2 = Ext.getCmp(prototype.id + '-cboFP2').getValue();
        
        var txtCIA = Ext.getCmp(prototype.id + '-txtCIA').getValue();
        var txtUNIDA = Ext.getCmp(prototype.id + '-txtUNIDA').getValue();
        var txtCECOS = Ext.getCmp(prototype.id + '-txtCECOS').getValue();
        var txtUBICA = Ext.getCmp(prototype.id + '-txtUBICA').getValue();
        var txtCTA = Ext.getCmp(prototype.id + '-txtCTA').getValue();
        var txtSCTA = Ext.getCmp(prototype.id + '-txtSCTA').getValue();
        var txtEQUI = Ext.getCmp(prototype.id + '-txtEQUI').getValue();
        var txtICIA = Ext.getCmp(prototype.id + '-txtICIA').getValue();
        
        var txtStartDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtStartDate').getValue(), 'Ymd');
        var txtEndDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtEndDate').getValue(), 'Ymd');
        txtEndDate = txtEndDate === '' ? '99999999' : txtEndDate;
        
        return {
            strOption: strOption,
            A1736PAIS: cboCountry2,
            A1736FUENT: cboSource,
            A1736TIPO: cboType2,
            A1736CURR: cboCurrency2,
            A1736NOMBR: txtDescription,
            A1736FORPG: txtPayment,
            A1736TIDOC: txtTypePayment,
            A1736CLIEN: txtClient2,
            A1736DIREC: txtAddress,
            A1736IATA: txtIATA2,
            A1736UO: "",
            A1736TAXI: txtTax,
            A1736SUBFU: txtSubFu,
            A1736FP: cboFP2,
            
            A1736CIA: txtCIA,
            A1736UNID: txtUNIDA,
            A1736CECO: txtCECOS,
            A1736UBI: txtUBICA,
            A1736CTAC: txtCTA,
            A1736SCTA: txtSCTA,
            A1736EQUI: txtEQUI,
            A1736ICIA: txtICIA,
            
            A1736FINI: txtStartDate,
            A1736FFIN: txtEndDate,
            IN_A1736PAIS_OLD: this.lblCountryOld,
            IN_A1736FUENTE_OLD: this.lblSourceOld,
            IN_A1736TIPO_OLD: this.lblTypeOld,
            IN_A1736MONEDA_OLD: this.lblCurrencyOld,
            IN_A1736SUBFU_OLD: this.lblSubFuOld,
            IN_A1736FP_OLD: this.lblFPOld,
            IN_A1736IATA_OLD: this.lblIATAOld,
            IN_A1736CIA_OLD: this.lblCIAOld
        };
    }
    
});