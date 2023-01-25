Ext.define('Ext.Praxis.controller.sales.MasterEMDSubcode.DataEntryMasterEMDSubcodeController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMasterEMDSubcodeController',

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
                Ext.getCmp(prototype.id + '-txtA1772SUBCD2').setReadOnly(true);
                Ext.getCmp(prototype.id + '-txtA1772RFIC2').setReadOnly(true);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA1772SUBCD2').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1772RFIC2').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1772SUBCD2').focus();
                break;
        }
    },
    getDataInputs: function(rec) {
        Ext.getCmp(prototype.id + '-txtA1772SUBCD2').setValue(rec.get('A1772SUBCD'));
        Ext.getCmp(prototype.id + '-txtA1772RFIC2').setValue(rec.get('A1772RFIC'));
        Ext.getCmp(prototype.id + '-txtA1772EMD').setValue(rec.get('A1772EMD'));
        Ext.getCmp(prototype.id + '-txtA1772FEE').setValue(rec.get('A1772FEE'));
        Ext.getCmp(prototype.id + '-txtA1772GRUPO').setValue(rec.get('A1772GRUPO'));
        Ext.getCmp(prototype.id + '-txtA1772SGRUP').setValue(rec.get('A1772SGRUP'));
        Ext.getCmp(prototype.id + '-txtA1772FIVIG').setValue(rec.get('A1772FIVIG'));
        Ext.getCmp(prototype.id + '-txtA1772FFVIG').setValue(rec.get('A1772FFVIG'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1772REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1772FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1772HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1772REVIS'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1772FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1772HREVI'));
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var VP_A1772RFIC = Ext.getCmp(prototype.id + '-txtA1772RFIC2').getValue();
        var VP_A1772SUBCD = Ext.getCmp(prototype.id + '-txtA1772SUBCD2').getValue();
        var VP_A1772EMD = Ext.getCmp(prototype.id + '-txtA1772EMD').getValue();
        var VP_A1772FEE = Ext.getCmp(prototype.id + '-txtA1772FEE').getValue();

        if (VP_A1772RFIC === "" || VP_A1772SUBCD === "" || 
                VP_A1772EMD === "" || VP_A1772FEE === "") {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else { 
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
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
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
            url: prototype.url + '/setPX113S02A1772',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.MESSAGE;
                var icon=1;
                if(msg==='DUPLICATE KEY, VERIFY!'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryMasterEMDSubcodeForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var txtA1772FEE = Ext.getCmp(prototype.id + '-txtA1772FEE').getValue();
        var txtA1772GRUPO = Ext.getCmp(prototype.id + '-txtA1772GRUPO').getValue();
        var txtA1772EMD = Ext.getCmp(prototype.id + '-txtA1772EMD').getValue();
        var txtA1772SGRUP = Ext.getCmp(prototype.id + '-txtA1772SGRUP').getValue();
        var txtA1772RFIC = Ext.getCmp(prototype.id + '-txtA1772RFIC2').getValue();
        var txtA1772SUBCD = Ext.getCmp(prototype.id + '-txtA1772SUBCD2').getValue();
        var txtA1772FIVIG = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1772FIVIG').getValue(), 'Ymd');
        var txtA1772FFVIG = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1772FFVIG').getValue(), 'Ymd');
        
        return {
            strOption: strOption,
            VP_A1772FEE: txtA1772FEE,
            VP_A1772GRUPO: txtA1772GRUPO,
            VP_A1772EMD: txtA1772EMD,
            VP_A1772SGRUP: txtA1772SGRUP,
            VP_A1772RFIC: txtA1772RFIC,
            VP_A1772SUBCD: txtA1772SUBCD,
            VP_A1772FIVIG: txtA1772FIVIG,
            VP_A1772FFVIG: txtA1772FFVIG
        };
    }
    
});