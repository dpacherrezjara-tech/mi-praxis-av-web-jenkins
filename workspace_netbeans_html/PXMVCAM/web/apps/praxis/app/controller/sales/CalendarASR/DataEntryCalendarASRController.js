Ext.define('Ext.Praxis.controller.sales.CalendarASR.DataEntryCalendarASRController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCalendarASRController',

    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA1528FPRO').setReadOnly(true);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA1528FPRO').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1528FPRO').focus();
                break;
        }
        // global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtA1528FPRO').setValue(rec.get('A1528FPRO'));
        Ext.getCmp(prototype.id + '-txtA1528PRDA').setValue(rec.get('A1528PRDA'));
        Ext.getCmp(prototype.id + '-txtA1528PDIDC').setValue(rec.get('A1528PDIDC'));
        Ext.getCmp(prototype.id + '-txtA1528PDIDM').setValue(rec.get('A1528PDIDM'));
        Ext.getCmp(prototype.id + '-txtA1528PDIDS').setValue(rec.get('A1528PDIDS'));
        Ext.getCmp(prototype.id + '-txtA1528ANIO').setValue(rec.get('A1528ANIO'));
        Ext.getCmp(prototype.id + '-txtA1528CUART').setValue(rec.get('A1528CUART'));
        Ext.getCmp(prototype.id + '-txtA1528CNULO').setValue(rec.get('A1528CNULO'));
        Ext.getCmp(prototype.id + '-txtA1528OBS').setValue(rec.get('A1528OBS'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1528USRIN'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1528FECIN'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1528HORIN'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1528USRAC'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1528FECAC'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1528HORAC'));

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var A1528FPRO = Ext.getCmp(prototype.id + '-txtA1528FPRO').getValue();

        if (A1528FPRO === "") {
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
//    onUpdateClick: function(btn) {
//        var p = this.view.params;
//        Ext.Msg.show({
//            title:'.:PRAXIS:.',
//            msg: 'Are you sure to update ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            animateTarget: btn,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn){
//                if (btn === 'yes'){
//                    console.log("LISTO PARA UPDATE");
////                    this.view.params.action = "U";
////                    this.save();
//                }
//            }
//        });
//    },
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
            url: prototype.url + '/MantCalendarASR',
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
                        Ext.getCmp('DataEntryCalendarASRForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var txtA1528FPRO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1528FPRO').getValue(), 'Ymd');
        var txtA1528ANIO = Ext.getCmp(prototype.id + '-txtA1528ANIO').getValue();
        var txtA1528CUART = Ext.getCmp(prototype.id + '-txtA1528CUART').getValue();
        var txtA1528PDIDM = Ext.getCmp(prototype.id + '-txtA1528PDIDM').getValue();
        var txtA1528PDIDS = Ext.getCmp(prototype.id + '-txtA1528PDIDS').getValue();
        var txtA1528PDIDC = Ext.getCmp(prototype.id + '-txtA1528PDIDC').getValue();
        var txtA1528PRDA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1528PRDA').getValue(), 'Ymd');
        var txtA1528CNULO = Ext.getCmp(prototype.id + '-txtA1528CNULO').getValue();
        var txtA1528OBS = Ext.getCmp(prototype.id + '-txtA1528OBS').getValue();
        
        return {
            strOption: strOption,
            A1528FPRO: txtA1528FPRO,
            A1528ANIO: txtA1528ANIO,
            A1528CUART: txtA1528CUART,
            A1528PDIDM: txtA1528PDIDM,
            A1528PDIDS: txtA1528PDIDS,
            A1528PDIDC: txtA1528PDIDC,
            A1528PRDA: txtA1528PRDA,
            A1528CNULO: txtA1528CNULO,
            A1528OBS: txtA1528OBS
        };
    }
    
});