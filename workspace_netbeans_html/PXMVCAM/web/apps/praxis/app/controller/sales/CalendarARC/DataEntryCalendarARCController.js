Ext.define('Ext.Praxis.controller.sales.CalendarARC.DataEntryCalendarARCController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCalendarARCController',

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
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
//                Ext.getCmp(prototype.id + '-txtAirline').focus();
                break;
        }
        // global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtA1528FPRO').setValue(rec.get('A1527PPED'));
        Ext.getCmp(prototype.id + '-txtA1527PDIDS').setValue(rec.get('A1527PDIDS'));
        Ext.getCmp(prototype.id + '-txtA1527SODA').setValue(rec.get('A1527SODA'));
        Ext.getCmp(prototype.id + '-txtA1527PDIDC').setValue(rec.get('A1527PDIDC'));
        Ext.getCmp(prototype.id + '-txtA1527ANIO').setValue(rec.get('A1527ANIO'));
        Ext.getCmp(prototype.id + '-txtA1527CUART').setValue(rec.get('A1527CUART'));
        Ext.getCmp(prototype.id + '-txtA1527PDIDM').setValue(rec.get('A1527PDIDM'));
        Ext.getCmp(prototype.id + '-txtA1527CINTA').setValue(rec.get('A1527CINTA'));
        Ext.getCmp(prototype.id + '-txtA1527DESEM').setValue(rec.get('A1527DESEM'));
        Ext.getCmp(prototype.id + '-txtA1527CNULO').setValue(rec.get('A1527CNULO'));
        Ext.getCmp(prototype.id + '-txtA1527OBS').setValue(rec.get('A1527OBS'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1527USRIN'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1527FECIN'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1527HORIN'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1527USRAC'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1527FECAC'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1527HORAC'));

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var A1527PPED = Ext.getCmp(prototype.id + '-txtA1528FPRO').getValue();
        var A1527PDIDC = Ext.getCmp(prototype.id + '-txtA1527PDIDC').getValue();

        if (A1527PPED === "" || A1527PDIDC === "") {
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
            url: prototype.url + '/MantCalendarARC',
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
                        Ext.getCmp('DataEntryCalendarARCForm').close(),
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
        var txtA1527ANIO = Ext.getCmp(prototype.id + '-txtA1527ANIO').getValue();
        var txtA1527CUART = Ext.getCmp(prototype.id + '-txtA1527CUART').getValue();
        var txtA1527PDIDM = Ext.getCmp(prototype.id + '-txtA1527PDIDM').getValue();
        var txtA1527PDIDS = Ext.getCmp(prototype.id + '-txtA1527PDIDS').getValue();
        var txtA1527PDIDC = Ext.getCmp(prototype.id + '-txtA1527PDIDC').getValue();
        var txtA1527SODA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1527SODA').getValue(), 'Ymd');
        var txtA1527CINTA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1527CINTA').getValue(), 'Ymd');
        var txtA1527DESEM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1527DESEM').getValue(), 'Ymd');
        var txtA1527CNULO = Ext.getCmp(prototype.id + '-txtA1527CNULO').getValue();
        var txtA1527OBS = Ext.getCmp(prototype.id + '-txtA1527OBS').getValue();
        
        return {
            strOption: strOption,
            A1527PPED: txtA1528FPRO,
            A1527ANIO: txtA1527ANIO,
            A1527CUART: txtA1527CUART,
            A1527PDIDM: txtA1527PDIDM,
            A1527PDIDS: txtA1527PDIDS,
            A1527PDIDC: txtA1527PDIDC,
            A1527SODA: txtA1527SODA,
            A1527CINTA: txtA1527CINTA,
            A1527DESEM: txtA1527DESEM,
            A1527CNULO: txtA1527CNULO,
            A1527OBS: txtA1527OBS
        };
    }
    
});