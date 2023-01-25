Ext.define('Ext.Praxis.controller.sales.AccountingMasterPagaTodo.DataEntryAccountingMasterPagaTodoController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterPagaTodoController',
    lblA1835FOPID: '',
    lblA1835TARPT: '',
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
                Ext.getCmp(prototype.id + '-cbxSource').setValue("1");
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
//        this.setComboBoxItemData(rec.get('A1740TIPO'));
        Ext.getCmp(prototype.id + '-cmbA1835FOPID').setValue(rec.get('A1835FOPID'));
        Ext.getCmp(prototype.id + '-txtA1835TARPT').setValue(rec.get('A1835TARPT'));
        Ext.getCmp(prototype.id + '-txtA1835CIA').setValue(rec.get('A1835CIA'));
        Ext.getCmp(prototype.id + '-txtA1835UNIDA').setValue(rec.get('A1835UNIDA'));
        Ext.getCmp(prototype.id + '-txtA1835CENCO').setValue(rec.get('A1835CENCO'));
        Ext.getCmp(prototype.id + '-txtA1835UBICA').setValue(rec.get('A1835UBICA'));
        Ext.getCmp(prototype.id + '-txtA1835CUENT').setValue(rec.get('A1835CUENT'));
        Ext.getCmp(prototype.id + '-txtA1835SUBCT').setValue(rec.get('A1835SUBCT'));
        Ext.getCmp(prototype.id + '-txtA1835EQUI').setValue(rec.get('A1835EQUI'));
        Ext.getCmp(prototype.id + '-txtA1835INCIA').setValue(rec.get('A1835INCIA'));
        Ext.getCmp(prototype.id + '-txtA1835CONC').setValue(rec.get('A1835CONC'));
//        
        Ext.getCmp(prototype.id + '-txtStartDate').setValue(rec.get('A1835FINI'));
        Ext.getCmp(prototype.id + '-txtEndDate').setValue(rec.get('A1835FFIN')==='9999/99/99' ? '' : rec.get('A1835FFIN'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1835REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1835FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1835HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1835REGVI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1835FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1835HREVI'));
        
        this.lblA1835FOPID = rec.get('A1835FOPID');
        this.lblA1835TARPT = rec.get('A1835TARPT');
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function() {
        var bvalida = true;
        var cmbA1835FOPID = Ext.getCmp(prototype.id + '-cmbA1835FOPID').getValue();
        
        if( cmbA1835FOPID ===""){
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
                        Ext.getCmp('DataEntryAccountingMasterPagaTodoForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var cmbA1835FOPID = Ext.getCmp(prototype.id + '-cmbA1835FOPID').getValue();
        var txtA1835TARPT = Ext.getCmp(prototype.id + '-txtA1835TARPT').getValue();
        var txtA1835CONC = Ext.getCmp(prototype.id + '-txtA1835CONC').getValue();
        var txtA1835CIA = Ext.getCmp(prototype.id + '-txtA1835CIA').getValue();
        var txtA1835UNIDA = Ext.getCmp(prototype.id + '-txtA1835UNIDA').getValue();
        var txtA1835CENCO = Ext.getCmp(prototype.id + '-txtA1835CENCO').getValue();
        var txtA1835UBICA = Ext.getCmp(prototype.id + '-txtA1835UBICA').getValue();
        var txtA1835CUENT = Ext.getCmp(prototype.id + '-txtA1835CUENT').getValue();
        var txtA1835SUBCT = Ext.getCmp(prototype.id + '-txtA1835SUBCT').getValue();
        var txtA1835EQUI = Ext.getCmp(prototype.id + '-txtA1835EQUI').getValue();
        var txtA1835INCIA = Ext.getCmp(prototype.id + '-txtA1835INCIA').getValue();
        
        var txtStartDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtStartDate').getValue(), 'Ymd');
        txtStartDate = txtStartDate === '' ? '99999999' : txtStartDate;
        var txtEndDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtEndDate').getValue(), 'Ymd');
        txtEndDate = txtEndDate === '' ? '99999999' : txtEndDate;
        
        return {
            strOption: strOption,
            A1835FOPID: cmbA1835FOPID,
            A1835TARPT: txtA1835TARPT,
            A1835CONC: txtA1835CONC,
            A1835CIA: txtA1835CIA,
            A1835UNIDA: txtA1835UNIDA,
            A1835CENCO: txtA1835CENCO,
            A1835UBICA: txtA1835UBICA,
            A1835CUENT: txtA1835CUENT,
            A1835SUBCT: txtA1835SUBCT,
            A1835EQUI: txtA1835EQUI,
            A1835INCIA: txtA1835INCIA,
            IN_A1835FOPID_OLD: this.lblA1835FOPID,
            IN_A1835TARPT_OLD: this.lblA1835TARPT,
            A1835FINI: txtStartDate,
            A1835FFIN: txtEndDate
        };
    }
    
});