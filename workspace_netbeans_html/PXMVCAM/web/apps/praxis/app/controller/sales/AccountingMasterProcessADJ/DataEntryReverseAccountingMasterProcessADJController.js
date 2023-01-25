Ext.define('Ext.Praxis.controller.sales.AccountingMasterProcessADJ.DataEntryReverseAccountingMasterProcessADJController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryReverseAccountingMasterProcessADJController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanParam: '',
    // </editor-fold>
    init: function(view) {

    },
    afterRender: function(){
        this.p = this.view.params;    
        this.mostrarData(this.p.rec,this.p.obj);
    },
    mostrarData: function(rec,obj) {
        Ext.getCmp(prototype.id+'-txtProcessDate2').setValue(obj.A1955FPROC);
        Ext.getCmp(prototype.id+'-txtRegistrationDate2').setValue(rec.A1955FECIN);
        Ext.getCmp(prototype.id+'-lblTotal').setText(rec.A1955QCPNR);
    },
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {                        
                    this.llenarData();                    
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    llenarData: function() {
        this.beanParam = {};
        
        this.beanParam = {
            IN_FECHA_PROCESO : Ext.getCmp(prototype.id+'-txtProcessDate2').getValue(),
            IN_FECHA_CONTABLE: Ext.getCmp(prototype.id+'-txtRegistrationDate2').getValue(),
            IN_ENVIO: Ext.getCmp(prototype.id+'-chkRegularizacion').getValue(),
            A1955MODUL: 'PSALES',
            strOption: 'D'
        };        
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.beanParam,
            beforerequest: Ext.getCmp('DataEntryReverseAccountingMasterProcessADJForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.intResult;
                    var icon=1;
                    if(msg==='RECORD EXISTS'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msg==='RECORD REMOVED') {
                                Ext.getCmp('DataEntryReverseAccountingMasterProcessADJForm').close();
                                Ext.getCmp('DataEntryAccountingMasterProcessADJForm').close();
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryReverseAccountingMasterProcessADJForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryReverseAccountingMasterProcessADJForm').unmask();
            }
        });
    }
});