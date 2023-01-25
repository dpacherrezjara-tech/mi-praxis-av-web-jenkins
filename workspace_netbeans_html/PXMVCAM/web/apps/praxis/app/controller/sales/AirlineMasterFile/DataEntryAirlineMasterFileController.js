Ext.define('Ext.Praxis.controller.sales.AirlineMasterFile.DataEntryAirlineMasterFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAirlineMasterFileController',

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
//                Ext.getCmp(prototype.id + '-txtNameCountry').focus();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
//                Ext.getCmp(prototype.id + '-txtA006PAIS').focus();
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtA005KEY').setValue(rec.get('A005KEY'));
        Ext.getCmp(prototype.id + '-txtA005KEY1').setValue(rec.get('A005KEY1'));
        Ext.getCmp(prototype.id + '-txtA005KEY2').setValue(rec.get('A005KEY2'));
        Ext.getCmp(prototype.id + '-txtA005CHS').setValue(rec.get('A005CHS'));
        Ext.getCmp(prototype.id + '-txtA005KEY3').setValue(rec.get('A005KEY3'));
        
        Ext.getCmp(prototype.id + '-cmbA005INDCOM').setValue(rec.get('A005INDCOM'));
        Ext.getCmp(prototype.id + '-txtA005COMISP').setValue(rec.get('A005COMISP'));
        Ext.getCmp(prototype.id + '-txtA005ZONA').setValue(rec.get('A005ZONA'));
        Ext.getCmp(prototype.id + '-txtA005ACHS').setValue(rec.get('A005ACHS'));
        Ext.getCmp(prototype.id + '-txtA005CIAS').setValue(rec.get('A005CIAS'));
        Ext.getCmp(prototype.id + '-txtA005ACPL').setValue(rec.get('A005ACPL'));
        
        Ext.Ajax.request({
            url: prototype.url + '/getDataAudit_A006',
            method: 'POST',
            timeout: 60000000,
            params: {
                keyTable: rec.get('A005KEY'),
                Table: "A005"
            },
//            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, options){
//                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;
                console.log(data);
                Ext.getCmp(prototype.id + '-USCR').setValue(data.A006USRCR);
                Ext.getCmp(prototype.id + '-FECR').setValue(data.A006FECCR);
                Ext.getCmp(prototype.id + '-HOCR').setValue(data.A006HORCR);
                Ext.getCmp(prototype.id + '-USUP').setValue(data.A006USRAC);
                Ext.getCmp(prototype.id + '-FEUP').setValue(data.A006FECAC);
                Ext.getCmp(prototype.id + '-HOUP').setValue(data.A006HORAC);
            }
        });
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onCmbA005INDCOMChange: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-cmbA005INDCOM').getValue();
        
        if (selectedValue === 'S') {
            Ext.getCmp(prototype.id + '-txtA005COMISP').setValue("0");
            Ext.getCmp(prototype.id + '-txtA005COMISP').setReadOnly(true);
        } else {
            Ext.getCmp(prototype.id + '-txtA005COMISP').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtA005COMISP').focus();
        }
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var txtA005KEY = Ext.getCmp(prototype.id + '-txtA005KEY').getValue();
        var txtA005KEY2 = Ext.getCmp(prototype.id + '-txtA005KEY2').getValue();

        if (txtA005KEY === "" || txtA005KEY2 === "") {
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
            url: prototype.url + '/maintanceA005',
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
                        Ext.getCmp('DataEntryAirlineMasterFileForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var txtA005KEY = Ext.getCmp(prototype.id + '-txtA005KEY').getValue();
        var txtA005KEY1 = Ext.getCmp(prototype.id + '-txtA005KEY1').getValue();
        var txtA005KEY2 = Ext.getCmp(prototype.id + '-txtA005KEY2').getValue();
        var txtA005CHS = Ext.getCmp(prototype.id + '-txtA005CHS').getValue();
        var txtA005KEY3 = Ext.getCmp(prototype.id + '-txtA005KEY3').getValue();
        
        var cmbA005INDCOM = Ext.getCmp(prototype.id + '-cmbA005INDCOM').getValue();
        var txtA005COMISP = Ext.getCmp(prototype.id + '-txtA005COMISP').getValue();
        var txtA005ZONA = Ext.getCmp(prototype.id + '-txtA005ZONA').getValue();
        var txtA005ACPL = Ext.getCmp(prototype.id + '-txtA005ACPL').getValue();
        var txtA005CIAS = Ext.getCmp(prototype.id + '-txtA005CIAS').getValue();
        
        return {
            strOption: strOption,
            A005KEY: txtA005KEY,
            A005KEY1: txtA005KEY1,
            A005KEY2: txtA005KEY2,
            A005ACHS: txtA005CHS,
            A005KEY3: txtA005KEY3,
            
            A005COMISP: txtA005COMISP,
            A005INDCOM: cmbA005INDCOM,
            A005ZONA: txtA005ZONA,
            A005ACPL: txtA005ACPL,
            A005CIAS: txtA005CIAS
        };
    }
    
});