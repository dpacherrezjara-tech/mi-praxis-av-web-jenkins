Ext.define('Ext.Praxis.controller.sales.AccountingMasterSales.DataEntryAccountingMasterSalesController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterSalesController',
    lblA1740TITRA: '',
    lblA1740TIPO: '',
    lblA1740SUBTI: '',
    lblA1740CATEG: '',
    init: function(view){
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
                Ext.getCmp(prototype.id + '-txtA1740TITRA').focus();
                Ext.getCmp(prototype.id + '-cmbCtaType2').setValue("");
                Ext.getCmp(prototype.id + '-cmbINTNU').setValue("");
                break;
        }
        Ext.getCmp(prototype.id + '-label_required01').show();
        Ext.getCmp(prototype.id + '-label_required02').hide();
        Ext.getCmp(prototype.id + '-label_required03').hide();
        Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(110);
        Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
//        this.setComboBoxItemData(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-cmbCtaType2').setValue(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-cmbINTNU').setValue(rec.get('A1740INTNU')=== 'YES' ? 'Y' : 'N');
        Ext.getCmp(prototype.id + '-txtA1740TITRA').setValue(rec.get('A1740TITRA'));
        Ext.getCmp(prototype.id + '-txtA1740SUBTI').setValue(rec.get('A1740SUBTI'));
        Ext.getCmp(prototype.id + '-txtA1740CATEG').setValue(rec.get('A1740CATEG'));
        Ext.getCmp(prototype.id + '-txtA1740CIA').setValue(rec.get('A1740CIA'));
        Ext.getCmp(prototype.id + '-txtA1740UNIDA').setValue(rec.get('A1740UNIDA'));
        Ext.getCmp(prototype.id + '-txtA1740CECOS').setValue(rec.get('A1740CECOS'));
        Ext.getCmp(prototype.id + '-txtA1740UBICA').setValue(rec.get('A1740UBICA'));
        Ext.getCmp(prototype.id + '-txtA1740CTA').setValue(rec.get('A1740CTA'));
        
        Ext.getCmp(prototype.id + '-txtA1740SCTA').setValue(rec.get('A1740SCTA'));
        Ext.getCmp(prototype.id + '-txtA1740EQUI').setValue(rec.get('A1740EQUI'));
        Ext.getCmp(prototype.id + '-txtA1740ICIA').setValue(rec.get('A1740ICIA'));
        Ext.getCmp(prototype.id + '-txtA1740CLIE').setValue(rec.get('A1740CLIE'));
        Ext.getCmp(prototype.id + '-txtA1740FINI2').setValue(rec.get('A1740FINI'));
        Ext.getCmp(prototype.id + '-txtA1740FFIN2').setValue(rec.get('A1740FFIN')==='9999/99/99' ? '' : rec.get('A1740FFIN'));
        
        this.lblA1740TITRA = rec.get('A1740TITRA');
        this.lblA1740TIPO = rec.get('A1740TIPO');
        this.lblA1740SUBTI = rec.get('A1740SUBTI');
        this.lblA1740CATEG = rec.get('A1740CATEG');
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1740REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1740FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1740HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1740REGVI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1740FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1740HREVI'));
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
    onTITRABlur: function() {
        var TypeDocument = Ext.getCmp(prototype.id + '-txtA1740TITRA').getValue();
        Ext.getCmp(prototype.id + '-label_required01').show();
        
        switch (TypeDocument) {
            case "EMD":
                Ext.getCmp(prototype.id + '-label_required02').show();
                Ext.getCmp(prototype.id + '-label_required03').show();
                Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(90);
                Ext.getCmp(prototype.id + '-label_Category').setWidth(75);
                break;
            case "MPD":
                Ext.getCmp(prototype.id + '-label_required02').show();
                Ext.getCmp(prototype.id + '-label_required03').hide();
                Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(90);
                Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
                break;
            default:
                Ext.getCmp(prototype.id + '-label_required02').hide();
                Ext.getCmp(prototype.id + '-label_required03').hide();
                Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(110);
                Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function() {
        var bvalida = true;
        var TypeDocument = Ext.getCmp(prototype.id + '-txtA1740TITRA').getValue();
        var cmbCtaType2 = Ext.getCmp(prototype.id + '-cmbCtaType2').getValue();
        var cmbINTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        var txtA1740SUBTI = Ext.getCmp(prototype.id + '-txtA1740SUBTI').getValue();
        var txtA1740CATEG = Ext.getCmp(prototype.id + '-txtA1740CATEG').getValue();
        
        switch (TypeDocument) {
            case "EMD":
                if( cmbINTNU ==="" || cmbCtaType2 ==="" || txtA1740SUBTI === "" || txtA1740CATEG ===""){
                    bvalida = false;
                }
                break;
            case "MPD":
                if( cmbINTNU ==="" || cmbCtaType2 ==="" || txtA1740SUBTI === ""){
                    bvalida = false;
                }
                break;
            default:
                if(TypeDocument.length === 0 || cmbCtaType2 ==="" || cmbINTNU ===""){//cmbDocumentType.selectedIndex
                    bvalida = false;
                }
        }
        return bvalida;
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        if (!this.validaRequiredFields()) {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else {
            var txtA1740FINI2 = Ext.getCmp(prototype.id + '-txtA1740FINI2').getValue();
            var txtA1740FFIN2 = Ext.getCmp(prototype.id + '-txtA1740FFIN2').getValue();
            
            console.log(txtA1740FINI2 + '-' + txtA1740FFIN2);
            if(txtA1740FFIN2 !== null)
            {
                if ( txtA1740FINI2 !== null && txtA1740FFIN2 !== null && txtA1740FINI2 <= txtA1740FFIN2){
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
                }else{
                    global.Msg({
                    msg: 'End date must be greater than start date.',
                    fn: function() {}
                    });
                }
            }
            else
            {
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
            }
            
        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        
        if (!this.validaRequiredFields()) {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else { 
            var txtA1740FINI2 = Ext.getCmp(prototype.id + '-txtA1740FINI2').getValue();
            var txtA1740FFIN2 = Ext.getCmp(prototype.id + '-txtA1740FFIN2').getValue();
            
            console.log(txtA1740FINI2 + '-' + txtA1740FFIN2);
            if(txtA1740FFIN2 !== null)
            {
                if ( txtA1740FINI2 !== null && txtA1740FFIN2 !== null && txtA1740FINI2 <= txtA1740FFIN2){
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
                }else{
                    global.Msg({
                    msg: 'End date must be greater than start date.',
                    fn: function() {}
                    });
                }
            }
            else
            {
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
            }


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
                        Ext.getCmp('DataEntryAccountingMasterSalesForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var A1740TITRA = Ext.getCmp(prototype.id + '-txtA1740TITRA').getValue();
        var A1740TIPO = Ext.getCmp(prototype.id + '-cmbCtaType2').getValue();
        var A1740INTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        var A1740SUBTI = Ext.getCmp(prototype.id + '-txtA1740SUBTI').getValue();
        var A1740CATEG = Ext.getCmp(prototype.id + '-txtA1740CATEG').getValue();
        var A1740CIA = Ext.getCmp(prototype.id + '-txtA1740CIA').getValue();
        var A1740UNIDA = Ext.getCmp(prototype.id + '-txtA1740UNIDA').getValue();
        var A1740CECOS = Ext.getCmp(prototype.id + '-txtA1740CECOS').getValue();
        var A1740UBICA = Ext.getCmp(prototype.id + '-txtA1740UBICA').getValue();
        var A1740CTA = Ext.getCmp(prototype.id + '-txtA1740CTA').getValue();
        var A1740SCTA = Ext.getCmp(prototype.id + '-txtA1740SCTA').getValue();
        var A1740EQUI = Ext.getCmp(prototype.id + '-txtA1740EQUI').getValue();
        var A1740ICIA = Ext.getCmp(prototype.id + '-txtA1740ICIA').getValue();
        var A1740CLIE = Ext.getCmp(prototype.id + '-txtA1740CLIE').getValue();
        var A1740FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1740FINI2').getValue(), 'Ymd');
        var A1740FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1740FFIN2').getValue(), 'Ymd');
        A1740FFIN = A1740FFIN === '' ? '99999999' : A1740FFIN;
        
        return {
            strOption: strOption,
            A1740TITRA: A1740TITRA,
            A1740TIPO: A1740TIPO,
            A1740INTNU: A1740INTNU,
            A1740SUBTI: A1740SUBTI,
            A1740CATEG: A1740CATEG,
            A1740CIA: A1740CIA,
            A1740UNIDA: A1740UNIDA,
            A1740CECOS: A1740CECOS,
            A1740UBICA: A1740UBICA,
            A1740CTA: A1740CTA,
            A1740SCTA: A1740SCTA,
            A1740EQUI: A1740EQUI,
            A1740ICIA: A1740ICIA,
            A1740CLIE: A1740CLIE,
            A1740FINI: A1740FINI,
            A1740FFIN: A1740FFIN,
            IN_A1740TITRA_OLD: this.lblA1740TITRA,
            IN_A1740TIPO_OLD: this.lblA1740TIPO,
            IN_A1740SUBTI_OLD: this.lblA1740SUBTI,
            IN_A1740CATEG_OLD: this.lblA1740CATEG
        };
    }
    
});