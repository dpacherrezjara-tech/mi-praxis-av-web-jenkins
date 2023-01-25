Ext.define('Ext.Praxis.controller.sales.CalendarBSP.DataEntryCalendarBSPController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCalendarBSPController',

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
                Ext.getCmp(prototype.id + '-txtA1529ISOC').setReadOnly(true);
                Ext.getCmp(prototype.id + '-txtA1529PRDA').setReadOnly(true);
                Ext.getCmp(prototype.id + '-txtA1529RPTO').setReadOnly(true);
                Ext.getCmp(prototype.id + '-txtA1529BAED').setReadOnly(true);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA1529ISOC').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1529PRDA').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1529RPTO').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1529BAED').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA1529ISOC').focus();
                break;
        }
        // global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
        Ext.getCmp(prototype.id + '-txtA1529ISOC').setValue(rec.get('A1529ISOC'));
        Ext.getCmp(prototype.id + '-txtA1529PRDA').setValue(rec.get('A1529PRDA'));
        Ext.getCmp(prototype.id + '-txtA1529PDAIM').setValue(rec.get('A1529PDAIM'));
        Ext.getCmp(prototype.id + '-txtA1529PDAIS').setValue(rec.get('A1529PDAIS'));
        Ext.getCmp(prototype.id + '-txtA1529PCYC').setValue(rec.get('A1529PCYC'));
        Ext.getCmp(prototype.id + '-txtA1529RPTO').setValue(rec.get('A1529RPTO'));
        Ext.getCmp(prototype.id + '-txtA1529BAED').setValue(rec.get('A1529BAED'));
        Ext.getCmp(prototype.id + '-txtA1529MESB').setValue(rec.get('A1529MESB'));
        Ext.getCmp(prototype.id + '-txtA1529PERI').setValue(rec.get('A1529PERI'));
        Ext.getCmp(prototype.id + '-txtA1529ANIO').setValue(rec.get('A1529ANIO'));
        Ext.getCmp(prototype.id + '-txtA1529CUART').setValue(rec.get('A1529CUART'));
        Ext.getCmp(prototype.id + '-txtA1529CUTO').setValue(rec.get('A1529CUTO'));
        Ext.getCmp(prototype.id + '-txtA1529LADM').setValue(rec.get('A1529LADM'));
        Ext.getCmp(prototype.id + '-txtA1529CLOS').setValue(rec.get('A1529CLOS'));
        Ext.getCmp(prototype.id + '-txtA1529SUBM').setValue(rec.get('A1529SUBM'));
        Ext.getCmp(prototype.id + '-txtA1529BAIR').setValue(rec.get('A1529BAIR'));
        Ext.getCmp(prototype.id + '-txtA1529BAGT').setValue(rec.get('A1529BAGT'));
        Ext.getCmp(prototype.id + '-txtA1529REMW').setValue(rec.get('A1529REMW'));
        Ext.getCmp(prototype.id + '-txtA1529REMQ').setValue(rec.get('A1529REMQ'));
        Ext.getCmp(prototype.id + '-txtA1529SETW').setValue(rec.get('A1529SETW'));
        Ext.getCmp(prototype.id + '-txtA1529SETF').setValue(rec.get('A1529SETF'));
        Ext.getCmp(prototype.id + '-txtA1529SETM').setValue(rec.get('A1529SETM'));
        Ext.getCmp(prototype.id + '-txtA1529DIST').setValue(rec.get('A1529DIST'));
        Ext.getCmp(prototype.id + '-txtA1529CNULO').setValue(rec.get('A1529CNULO'));
        Ext.getCmp(prototype.id + '-txtA1529OBS').setValue(rec.get('A1529OBS'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1529USRIN'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1529FECIN'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1529HORIN'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1529USRAC'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1529FECAC'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1529HORAC'));

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var A1529ISOC = Ext.getCmp(prototype.id + '-txtA1529ISOC').getValue();
        var A1529PRDA = Ext.getCmp(prototype.id + '-txtA1529PRDA').getValue();
        var A1529PDAIM = Ext.getCmp(prototype.id + '-txtA1529PDAIM').getValue();
        var A1529PCYC = Ext.getCmp(prototype.id + '-txtA1529PCYC').getValue();
        var A1529RPTO = Ext.getCmp(prototype.id + '-txtA1529RPTO').getValue();
        var A1529BAED = Ext.getCmp(prototype.id + '-txtA1529BAED').getValue();
        var A1529MESB = Ext.getCmp(prototype.id + '-txtA1529MESB').getValue();
        var A1529PERI = Ext.getCmp(prototype.id + '-txtA1529PERI').getValue();
        var A1529ANIO = Ext.getCmp(prototype.id + '-txtA1529ANIO').getValue();

        if (A1529ISOC === "" || A1529PRDA === "" || A1529PDAIM === "" ||
                A1529PCYC === "" || A1529RPTO === "" || A1529BAED === "" ||
                A1529MESB === "" || A1529PERI === "" || A1529ANIO === "") {
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
            url: prototype.url + '/MantCalendarBSP',
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
                        Ext.getCmp('DataEntryCalendarBSPForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var txtA1529ISOC = Ext.getCmp(prototype.id + '-txtA1529ISOC').getValue();
        var txtA1529PRDA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529PRDA').getValue(), 'Ymd');
        var txtA1529PDAIM = Ext.getCmp(prototype.id + '-txtA1529PDAIM').getValue();
        var txtA1529PDAIS = Ext.getCmp(prototype.id + '-txtA1529PDAIS').getValue();
        var txtA1529PCYC = Ext.getCmp(prototype.id + '-txtA1529PCYC').getValue();
        var txtA1529RPTO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529RPTO').getValue(), 'Ymd');
        var txtA1529BAED = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529BAED').getValue(), 'Ymd');
        var txtA1529MESB = Ext.getCmp(prototype.id + '-txtA1529MESB').getValue();
        var txtA1529PERI = Ext.getCmp(prototype.id + '-txtA1529PERI').getValue();
        var txtA1529ANIO = Ext.getCmp(prototype.id + '-txtA1529ANIO').getValue();
        var txtA1529CUART = Ext.getCmp(prototype.id + '-txtA1529CUART').getValue();
        var txtA1529CUTO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529CUTO').getValue(), 'Ymd');
        var txtA1529LADM = Ext.getCmp(prototype.id + '-txtA1529LADM').getValue();
        var txtA1529CLOS = Ext.getCmp(prototype.id + '-txtA1529CLOS').getValue();
        var txtA1529SUBM = Ext.getCmp(prototype.id + '-txtA1529SUBM').getValue();
        var txtA1529BAIR = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529BAIR').getValue(), 'Ymd');
        var txtA1529BAGT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529BAGT').getValue(), 'Ymd');
        var txtA1529REMW = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529REMW').getValue(), 'Ymd');
        var txtA1529REMQ = Ext.getCmp(prototype.id + '-txtA1529REMQ').getValue();
        var txtA1529SETW = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1529SETW').getValue(), 'Ymd');
        var txtA1529SETF = Ext.getCmp(prototype.id + '-txtA1529SETF').getValue();
        var txtA1529SETM = Ext.getCmp(prototype.id + '-txtA1529SETM').getValue();
        var txtA1529DIST = Ext.getCmp(prototype.id + '-txtA1529DIST').getValue();
        var txtA1529CNULO = Ext.getCmp(prototype.id + '-txtA1529CNULO').getValue();
        var txtA1529OBS = Ext.getCmp(prototype.id + '-txtA1529OBS').getValue();
        
        return {
            strOption: strOption,
            A1529ISOC: txtA1529ISOC,
            A1529BAED: txtA1529BAED,
            A1529PERI: txtA1529PERI,
            A1529RPTO: txtA1529RPTO,
            A1529ANIO: txtA1529ANIO,
            A1529CUART: txtA1529CUART,
            A1529PDAIM: txtA1529PDAIM,
            A1529PDAIS: txtA1529PDAIS,
            A1529PCYC: txtA1529PCYC,
            A1529PRDA: txtA1529PRDA,
            A1529CUTO: txtA1529CUTO,
            A1529LADM: txtA1529LADM,
            A1529CLOS: txtA1529CLOS,
            A1529SUBM: txtA1529SUBM,
            A1529BAIR: txtA1529BAIR,
            A1529BAGT: txtA1529BAGT,
            A1529REMW: txtA1529REMW,
            A1529REMQ: txtA1529REMQ,
            A1529SETW: txtA1529SETW,
            A1529SETF: txtA1529SETF,
            A1529SETM: txtA1529SETM,
            A1529DIST: txtA1529DIST,
            A1529CNULO: txtA1529CNULO,
            A1529OBS: txtA1529OBS,
            A1529MESB: txtA1529MESB
        };
    }
    
});