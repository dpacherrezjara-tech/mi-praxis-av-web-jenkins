Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryDeleteController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDeleteController',
    meEntryIp: '',
    p: {},
    strFormatDate: '',
    str: '',
    tempLink: '',
    dwfile: '',
    init: function(view) {
        meEntryIp = this;
        this.p = this.view.params;
        console.log(this.p);
    },
    afterRender: function(){
//        Ext.getCmp(prototype.id + '-txtDate').setValue(this.p.strFecha);
//        Ext.getCmp(prototype.id + '-txtPernum').setValue(this.p.strFuente);
    },
    btnExport_clickHandler: function(cmp, cpm2, numRow, numCol, cpm3, rowData) {
        var data = rowData.data;
        var bean = {
            FILLER1: data.FILLER1,
            strFormatDate: data.strFormatDate
        };
        meEntryIp.dwfile = JSON.stringify(bean);
        Ext.getCmp(prototype.id + '-btnDownload').show();
    },
    
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    
    onDeleteDuplicate: function() {
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    
                    beanTemp.DFLIGHT = Ext.getCmp(prototype.id + '-txtFlightDateDel').getValue();
                    beanTemp.NFLIGHT = Ext.getCmp(prototype.id + '-txtFlightNumberDel').getValue();
                    beanTemp.CDEPART = Ext.getCmp(prototype.id + '-txtCDEPARTDel').getValue();
                    beanTemp.CARRIVA = Ext.getCmp(prototype.id + '-txtCARRIVADel').getValue();
                    
                    var msjResult = this.validacionDelete(beanTemp);
                    
                    if (msjResult === '') {
                        this.deleteDuplicateA3729(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    
    deleteDuplicateA3729: function(beanTemp) {
        
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/deleteDuplicateA3729',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryDeleteFlightConciliationForm').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-DataEntryDeleteFlightConciliationForm').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    
                    Ext.getCmp(prototype.id + '-DataEntryDeleteFlightConciliationForm').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                } else
                    global.Msg({msg: 'An error occurred'});
            }
        });
    },
    
    validacionDelete: function(beanTemp) {
        var msjResult = '';
        if (Ext.getCmp(prototype.id + '-txtFlightDateDel').getValue() === '' || 
            Ext.getCmp(prototype.id + '-txtFlightNumberDel').getValue() === '' || 
            Ext.getCmp(prototype.id + '-txtCDEPARTDel').getValue() === '' || 
            Ext.getCmp(prototype.id + '-txtCARRIVADel').getValue() === '') {
        
                msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    
});