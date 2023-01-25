    Ext.define('Ext.Praxis.controller.sales.CityMasterFile.DataEntryCityMasterFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCityMasterFileController',

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
                Ext.getCmp(prototype.id + '-txtA1007CTATO').focus();
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtA1007CTATO').setValue(rec.get('A1007CTATO'));
        Ext.getCmp(prototype.id + '-txtA1007NOMBR').setValue(rec.get('A1007NOMBR'));
        Ext.getCmp(prototype.id + '-txtA1007CATEG').setValue(rec.get('A1007CATEG'));
        Ext.getCmp(prototype.id + '-txtA1007TIMZ').setValue(rec.get('A1007TIMZ'));
        
        Ext.getCmp(prototype.id + '-txtA1007CIUD').setValue(rec.get('A1007CIUD'));
        Ext.getCmp(prototype.id + '-txtA1007NOMCD').setValue(rec.get('A1007NOMCD'));
        Ext.getCmp(prototype.id + '-txtA1007STATE').setValue(rec.get('A1007STATE'));
        Ext.getCmp(prototype.id + '-txtA1007STAT').setValue(rec.get('A1007STAT'));
        
        Ext.getCmp(prototype.id + '-txtA1007PAIS').setValue(rec.get('A1007PAIS'));
        Ext.getCmp(prototype.id + '-txtA1007nomPAIS').setValue(rec.get('strNomPais'));
        
        Ext.getCmp(prototype.id + '-txtA1007LONG').setValue(rec.get('A1007LONG'));
        Ext.getCmp(prototype.id + '-txtA1007LATI').setValue(rec.get('A1007LATI'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1007REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1007FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1007HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1007REVIS'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1007FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1007HREVI'));

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var txtA1007CTATO = Ext.getCmp(prototype.id + '-txtA1007CTATO').getValue();
        var txtA1007PAIS = Ext.getCmp(prototype.id + '-txtA1007PAIS').getValue();
        var txtA1007CIUD = Ext.getCmp(prototype.id + '-txtA1007CIUD').getValue();
        var txtA1007NOMBR = Ext.getCmp(prototype.id + '-txtA1007NOMBR').getValue();
        var txtA1007NOMCD = Ext.getCmp(prototype.id + '-txtA1007NOMCD').getValue();
        var txtA1007STAT = Ext.getCmp(prototype.id + '-txtA1007STAT').getValue();

        if (txtA1007CTATO === "" || txtA1007PAIS === "" || txtA1007CIUD === "" ||
                txtA1007NOMBR === "" || txtA1007NOMCD === "" || txtA1007STAT === "") {
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
            url: prototype.url + '/cityReportMaintance',
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
                        Ext.getCmp('DataEntryCityMasterFileForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var A1007CTATO = Ext.getCmp(prototype.id + '-txtA1007CTATO').getValue();
        var A1007NOMBR = Ext.getCmp(prototype.id + '-txtA1007NOMBR').getValue();
        var A1007CATEG = Ext.getCmp(prototype.id + '-txtA1007CATEG').getValue();
        var A1007CIUD = Ext.getCmp(prototype.id + '-txtA1007CIUD').getValue();
        var A1007NOMCD = Ext.getCmp(prototype.id + '-txtA1007NOMCD').getValue();
        var A1007STATE = Ext.getCmp(prototype.id + '-txtA1007STATE').getValue();
        
        var A1007PAIS = Ext.getCmp(prototype.id + '-txtA1007PAIS').getValue();
        var A1007TIMZ = Ext.getCmp(prototype.id + '-txtA1007TIMZ').getValue();
        var A1007STAT = Ext.getCmp(prototype.id + '-txtA1007STAT').getValue();
        var A1007LONG = Ext.getCmp(prototype.id + '-txtA1007LONG').getValue();
        var A1007LATI = Ext.getCmp(prototype.id + '-txtA1007LATI').getValue();
        
        return {
            strOption: strOption,
            A1007CTATO: A1007CTATO,
            A1007NOMBR: A1007NOMBR,
            A1007CATEG: A1007CATEG,
            A1007CIUD: A1007CIUD,
            A1007NOMCD: A1007NOMCD,
            A1007STATE: A1007STATE,
            A1007PAIS: A1007PAIS,
            A1007TIMZ: A1007TIMZ,
            A1007STAT: A1007STAT,
            A1007LONG: A1007LONG,
            A1007LATI: A1007LATI
        };
    }
    
});