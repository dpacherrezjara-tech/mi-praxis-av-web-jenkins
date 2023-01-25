Ext.define('Ext.Praxis.controller.sales.PanicValue.DataEntryPanicValueController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPanicValueController',

    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
//                Ext.getCmp(prototype.id+'-btn-save').show();
//                Ext.getCmp(prototype.id+'-btn-update').hide();
//                Ext.getCmp(prototype.id+'-btn-delete').hide();
//                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
        }
    },
    getDataInputs: function(rec) {
        Ext.getCmp(prototype.id + '-txtA725TREGI').setValue(rec.get('A725TREGI'));
        Ext.getCmp(prototype.id + '-txtA725FDESDE').setValue(rec.get('A725FDESDE'));
        Ext.getCmp(prototype.id + '-txtA725FHASTA').setValue(rec.get('A725FHASTA'));
        Ext.getCmp(prototype.id + '-txtA725TARIFD').setValue(Ext.util.Format.number(rec.get('A725TARIFD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725TARIFA').setValue(Ext.util.Format.number(rec.get('A725TARIFA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725EQPAGD').setValue(Ext.util.Format.number(rec.get('A725EQPAGD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725EQPAGA').setValue(Ext.util.Format.number(rec.get('A725EQPAGA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725TCAMBD').setValue(Ext.util.Format.number(rec.get('A725TCAMBD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725TCAMBA').setValue(Ext.util.Format.number(rec.get('A725TCAMBA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725TFNUCD').setValue(Ext.util.Format.number(rec.get('A725TFNUCD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725TFNUCA').setValue(Ext.util.Format.number(rec.get('A725TFNUCA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725ROED').setValue(Ext.util.Format.number(rec.get('A725ROED'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725ROEA').setValue(Ext.util.Format.number(rec.get('A725ROEA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725PRDESD').setValue(Ext.util.Format.number(rec.get('A725PRDESD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725PRDESA').setValue(Ext.util.Format.number(rec.get('A725PRDESA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725CSVERD').setValue(Ext.util.Format.number(rec.get('A725CSVERD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725CSVERA').setValue(Ext.util.Format.number(rec.get('A725CSVERA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725PLUSSD').setValue(Ext.util.Format.number(rec.get('A725PLUSSD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725PLUSSA').setValue(Ext.util.Format.number(rec.get('A725PLUSSA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725FARED').setValue(Ext.util.Format.number(rec.get('A725FARED'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725FAREA').setValue(Ext.util.Format.number(rec.get('A725FAREA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725ACUERD').setValue(Ext.util.Format.number(rec.get('A725ACUERD'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725ACUERA').setValue(Ext.util.Format.number(rec.get('A725ACUERA'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725DIFGRO').setValue(Ext.util.Format.number(rec.get('A725DIFGRO'), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA725DIFTAX').setValue(Ext.util.Format.number(rec.get('A725DIFTAX'), '0,000.00'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A725REGIST'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A725FREGIS'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A725HREGIS'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A725REVISA'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A725FREVIS'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A725HREVIS'));
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
                        Ext.getCmp('DataEntryPanicValueForm').close(),
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
        var txtA1772FIVIG = Ext.getCmp(prototype.id + '-txtA1772FIVIG').getValue();
        var txtA1772FFVIG = Ext.getCmp(prototype.id + '-txtA1772FFVIG').getValue();
        
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