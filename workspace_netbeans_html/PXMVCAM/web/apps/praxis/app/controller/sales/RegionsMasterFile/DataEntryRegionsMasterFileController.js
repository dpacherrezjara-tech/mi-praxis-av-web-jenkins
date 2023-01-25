Ext.define('Ext.Praxis.controller.sales.RegionsMasterFile.DataEntryRegionsMasterFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRegionsMasterFileController',
    strTipoPK: '',
    strRegionPK: '',
    strPaisPK: '',
    strCiudadPK: '',
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
                Ext.getCmp(prototype.id + '-txtA128TIPO').focus();
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
        this.strTipoPK = rec.get('A128TIPO');
        this.strRegionPK = rec.get('A128AREGIO');
        this.strPaisPK = rec.get('A128PAIS');
        this.strCiudadPK = rec.get('A128CIUDAD');
        
        Ext.getCmp(prototype.id + '-txtA128TIPO').setValue(this.strTipoPK);
        Ext.getCmp(prototype.id + '-txtA128AREGIO').setValue(this.strRegionPK);
        Ext.getCmp(prototype.id + '-txtA128PAIS').setValue(this.strPaisPK);
        Ext.getCmp(prototype.id + '-txtA128CIUDAD').setValue(this.strCiudadPK);
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A128REGIST'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A128FREGIS'));
//        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1740HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A128REVISA'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A128FREVIS'));
//        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1740HREVI'));

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var txtA128TIPO = Ext.getCmp(prototype.id + '-txtA128TIPO').getValue();
        var txtA128AREGIO = Ext.getCmp(prototype.id + '-txtA128AREGIO').getValue();
        var txtA128PAIS = Ext.getCmp(prototype.id + '-txtA128PAIS').getValue();

        if (txtA128TIPO === "" || txtA128AREGIO === "" || txtA128PAIS === "") {
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
            url: prototype.url + '/maintanceRegionmf',
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
                        Ext.getCmp('DataEntryRegionsMasterFileForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var txtA128TIPO = Ext.getCmp(prototype.id + '-txtA128TIPO').getValue();
        var txtA128AREGIO = Ext.getCmp(prototype.id + '-txtA128AREGIO').getValue();
        var txtA128PAIS = Ext.getCmp(prototype.id + '-txtA128PAIS').getValue();
        var txtA128CIUDAD = Ext.getCmp(prototype.id + '-txtA128CIUDAD').getValue();
        
        return {
            strOption: strOption,
            A128TIPO: txtA128TIPO,
            A128AREGIO: txtA128AREGIO,
            A128PAIS: txtA128PAIS,
            A128CIUDAD: txtA128CIUDAD,
            A128TIPO_OLD: this.strTipoPK,
            A128AREGIO_OLD: this.strRegionPK,
            A128PAIS_OLD: this.strPaisPK,
            A128CIUDAD_OLD: this.strCiudadPK
        };
    }
    
});