Ext.define('Ext.Praxis.controller.sales.AccountingMasterTAX.DataEntryAccountingMasterTAXController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterTAXController',
    lblA1741PAIS: '',
    lblA1741CODE: '',
    lblA1741TIPO: '',
    lblA1741FINI: '',
    lblA1741FFIN: '',
    init: function(view){
        this.cargarComboBoxes();
    },
    afterRender: function(){
        this.p = this.view.params;
        console.log('OPTION-->' + this.p.action);
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
                Ext.getCmp(prototype.id + '-cmbA1741TIPO').setValue("");
                Ext.getCmp(prototype.id + '-cmbCountry2').setValue("");
                Ext.getCmp(prototype.id + '-cmbA1741TPTAX').setValue("");
                Ext.getCmp(prototype.id + '-cmbCurrency2').setValue("");
                Ext.getCmp(prototype.id + '-cmbA1741CTRL').setValue("");
                Ext.getCmp(prototype.id + '-cmbINTNU').setValue("");
                Ext.getCmp(prototype.id + '-cmbCountry2').focus();
                break;
        }
        global.AccessControlMaganer();
//        Ext.getCmp(prototype.id + '-label_required01').show();
//        Ext.getCmp(prototype.id + '-label_required02').hide();
//        Ext.getCmp(prototype.id + '-label_required03').hide();
//        Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(110);
//        Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
    },
    getDataInputs: function(rec) {
//        this.setComboBoxItemData(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-cmbCountry2').setValue(rec.get('A1741PAIS'));
        Ext.getCmp(prototype.id + '-cmbCurrency2').setValue(rec.get('A1741MONED'));
        Ext.getCmp(prototype.id + '-cmbA1741CTRL').setValue(rec.get('A1741CTRL'));
        Ext.getCmp(prototype.id + '-cmbA1741TPTAX').setValue(rec.get('A1741TPTAX'));
        Ext.getCmp(prototype.id + '-cmbA1741TIPO').setValue(rec.get('A1741TIPO'));
        Ext.getCmp(prototype.id + '-cmbINTNU').setValue(rec.get('A1741INTNU')=== 'YES' ? 'Y' : 'N');
        
        Ext.getCmp(prototype.id + '-txtTax').setValue(rec.get('A1741CODE'));
        Ext.getCmp(prototype.id + '-txtA1741CIA').setValue(rec.get('A1741CIA'));
        Ext.getCmp(prototype.id + '-txtA1741UNIDA').setValue(rec.get('A1741UNIDA'));
        Ext.getCmp(prototype.id + '-txtA1741CECOS').setValue(rec.get('A1741CECOS'));
        Ext.getCmp(prototype.id + '-txtA1741UBICA').setValue(rec.get('A1741UBICA'));
        Ext.getCmp(prototype.id + '-txtA1741CTA').setValue(rec.get('A1741CTA'));
        Ext.getCmp(prototype.id + '-txtA1741SCTA').setValue(rec.get('A1741SCTA'));
        Ext.getCmp(prototype.id + '-txtA1741EQUI').setValue(rec.get('A1741EQUI'));
        Ext.getCmp(prototype.id + '-txtA1741ICIA').setValue(rec.get('A1741ICIA'));
        Ext.getCmp(prototype.id + '-txtA1741CONCE').setValue(rec.get('A1741CONCE'));
        Ext.getCmp(prototype.id + '-txtA1741FINI').setValue(rec.get('A1741FINI'));
        Ext.getCmp(prototype.id + '-txtA1741FFIN').setValue(rec.get('A1741FFIN')==='9999/99/99' ? '' : rec.get('A1741FFIN'));
        
        this.lblA1741PAIS = Ext.getCmp(prototype.id + '-cmbCountry2').getValue();
        this.lblA1741CODE = Ext.getCmp(prototype.id + '-txtTax').getValue();
        this.lblA1741TIPO = Ext.getCmp(prototype.id + '-cmbA1741TIPO').getValue();
        
        this.lblA1741FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1741FINI').getValue(), 'Ymd');
        this.lblA1741FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1741FFIN').getValue(), 'Ymd');
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1741REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1741FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1741HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1741REGVI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1741FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1741HREVI'));
    },
    cargarComboBoxes: function () {
        this.p = this.view.params;
        var country = new Array(), currency = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/loadCombo',
            method: 'POST',
            timeout: 60000000,
//            params: searchParams,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                var lstCountry = res.lstCountry;
//                var lstTax = res.lstTax;
                var lstCurrency = res.lstCurrency;
                
                country.push(['', 'Select']);
                lstCountry.forEach(function callback(currentValue, index, array) {
                    country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cmbCountry2').bindStore(store);
                
                currency.push(['', 'Select']);
                lstCurrency.forEach(function callback(currentValue, index, array) {
                    currency.push([currentValue.A006MONEDA, currentValue.A006MONEDA]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'currency', autoLoad: true, data: currency, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cmbCurrency2').bindStore(store);
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
        var cmbA1741TIPO = Ext.getCmp(prototype.id + '-cmbA1741TIPO').getValue();
        var cmbA1741CTRL = Ext.getCmp(prototype.id + '-cmbA1741CTRL').getValue();
        var cmbA1741TPTAX = Ext.getCmp(prototype.id + '-cmbA1741TPTAX').getValue();
        var cmbCurrency = Ext.getCmp(prototype.id + '-cmbCurrency2').getValue();
        var txtTax = Ext.getCmp(prototype.id + '-txtTax').getValue();
        var cmbINTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        
        var txtA1741CIA = Ext.getCmp(prototype.id + '-txtA1741CIA').getValue();
        var txtA1741CTA = Ext.getCmp(prototype.id + '-txtA1741CTA').getValue();
        var txtA1741SCTA = Ext.getCmp(prototype.id + '-txtA1741SCTA').getValue();
        var txtA1741EQUI = Ext.getCmp(prototype.id + '-txtA1741EQUI').getValue();
        var txtA1741ICIA = Ext.getCmp(prototype.id + '-txtA1741ICIA').getValue();
        
        if( cmbINTNU ==="" || cmbA1741TIPO ==="" || cmbA1741CTRL === "" || cmbA1741TPTAX ===""|| cmbCurrency ===""|| txtTax ===""){
            bvalida = false;
        }
//        if( txtTax.length > 3){
//            bvalida = false;
//        }
        if( cmbINTNU ==="" || txtA1741CIA==="" || txtA1741CTA ==="" || txtA1741SCTA ==="" || txtA1741EQUI ==="" || txtA1741ICIA ===""){
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
                        Ext.getCmp('DataEntryAccountingMasterTAXForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var A1741TIPO = Ext.getCmp(prototype.id + '-cmbA1741TIPO').getValue();
        var A1741PAIS = Ext.getCmp(prototype.id + '-cmbCountry2').getValue();
        var A1741CODE = Ext.getCmp(prototype.id + '-txtTax').getValue();
        var A1741MONED = Ext.getCmp(prototype.id + '-cmbCurrency2').getValue();
        var A1741CTRL = Ext.getCmp(prototype.id + '-cmbA1741CTRL').getValue();
        var A1741TPTAX = Ext.getCmp(prototype.id + '-cmbA1741TPTAX').getValue();
        var A1741INTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        
        var A1741CIA = Ext.getCmp(prototype.id + '-txtA1741CIA').getValue();
        var A1741UNIDA = Ext.getCmp(prototype.id + '-txtA1741UNIDA').getValue();
        var A1741CECOS = Ext.getCmp(prototype.id + '-txtA1741CECOS').getValue();
        var A1741UBICA = Ext.getCmp(prototype.id + '-txtA1741UBICA').getValue();
        var A1741CTA = Ext.getCmp(prototype.id + '-txtA1741CTA').getValue();
        var A1741SCTA = Ext.getCmp(prototype.id + '-txtA1741SCTA').getValue();
        var A1741EQUI = Ext.getCmp(prototype.id + '-txtA1741EQUI').getValue();
        var A1741ICIA = Ext.getCmp(prototype.id + '-txtA1741ICIA').getValue();
        
        var A1741CONCE = Ext.getCmp(prototype.id + '-txtA1741CONCE').getValue();
        var A1741FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1741FINI').getValue(), 'Ymd');
        var A1741FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1741FFIN').getValue(), 'Ymd');
        A1741FFIN = A1741FFIN === '' ? '99999999' : A1741FFIN;
        
        return {
            strOption: strOption,
            A1741TIPO: A1741TIPO,
            A1741PAIS: A1741PAIS,
            A1741CODE: A1741CODE,
            A1741INTNU: A1741INTNU,
            A1741MONED: A1741MONED,
            A1741CIA: A1741CIA,
            A1741UNIDA: A1741UNIDA,
            A1741CECOS: A1741CECOS,
            A1741UBICA: A1741UBICA,
            A1741CTA: A1741CTA,
            A1741SCTA: A1741SCTA,
            A1741EQUI: A1741EQUI,
            A1741ICIA: A1741ICIA,
            A1741CONCE: A1741CONCE,
            A1741FINI: A1741FINI,
            A1741FFIN: A1741FFIN,
            A1741CTRL: A1741CTRL,
            A1741TPTAX: A1741TPTAX,
            IN_A1741PAIS_OLD: this.lblA1741PAIS,
            IN_A1741CODE_OLD: this.lblA1741CODE,
            IN_A1741TIPO_OLD: this.lblA1741TIPO,
            IN_A1741FINI_OLD: this.lblA1741FINI,
            IN_A1741FFIN_OLD: this.lblA1741FFIN
        };
    }
    
});