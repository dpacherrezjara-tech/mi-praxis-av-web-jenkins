Ext.define('Ext.Praxis.controller.sales.ConciliationASR.DataEntryTransactionConciliationASRController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTransactionConciliationASRController',
    strToday: '',
    init: function(view) {
        this.strToday = win.getFechaFormat();
    },
    afterRender: function(){ // global.AccessControlMaganer();
        this.p = this.view.params;
        this.clearDty();
        switch (this.p.action) {
            case 'I':
                this.view.setTitle('Sabre Interact vs PRAXIS - New Transaction');
                Ext.getCmp(prototype.id+'-btn-save').enable(true);
                Ext.getCmp(prototype.id+'-btn-update').disable(true);
                
                Ext.getCmp(prototype.id+'-txtFREPOR').setEditable(true);
                win.setValue('txtFREPOR', this.strToday);
                win.focus('txtFREPOR');
                break;
            case 'U':
                this.view.setTitle('Sabre Interact vs PRAXIS - Update Transaction');
                Ext.getCmp(prototype.id+'-btn-save').disable(true);
                Ext.getCmp(prototype.id+'-btn-update').enable(true);
                
                Ext.getCmp(prototype.id+'-txtFREPOR').setEditable(false);
                this.mostrarData(this.p.data);
                win.focus('txtSEQ');
                break;
        }
    },
    
    mostrarData: function(data) {
        win.setValue('txtWKSTAT', data.WKSTAT);
        var fecha = (data.FREPOR !== '') ? data.FREPOR : '';
        fecha = fecha.substring(0, 4)+'/'+fecha.substring(4, 6)+'/'+fecha.substring(6, 8);
        win.setValue('txtFREPOR', fecha);
        win.setValue('txtSEC', data.SEC);
        win.setValue('txtBSEC', data.BSEC);
        win.setValue('txtSEQ', data.SEQ);
        win.setValue('txtSTATION', data.STATION);
        win.setValue('txtCODE', data.CODE);
        win.setValue('txtOPDT', data.OPDT);
        win.setValue('txtOPTM', data.OPTM);
        win.setValue('txtST', data.ST);
        win.setValue('txtCLDT', data.CLDT);
        win.setValue('txtCLTM', data.CLTM);
        win.setValue('txtXTDT', data.XTDT);
        win.setValue('txtXTTM', data.XTTM);
        win.setValue('txtXTST', data.XTST);
        win.setValue('txtVOIDS', data.VOIDS);
        win.setValue('txtTTRANS', data.TTRANSP);
        win.setValue('txtDIFFERENCES', data.diffTransactions);
        if (data.processState === 'MATCH') {
            win.setValue('rgpState2', true);
        } else {
            win.setValue('rgpState1', true);
        }
        win.setValue('txaComment', data.COMENT);
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    onSaveClick: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Do you really want to save this transaction?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var filePXF051 = {};
                    filePXF051.WKSTAT = win.getValue('txtWKSTAT');
                    filePXF051.FREPOR = Ext.util.Format.date(win.getValue('txtFREPOR'), 'Ymd');
                    filePXF051.PSTATE = Number(win.getValue('rgpState').rgpState);
                    filePXF051.SEQ = win.getValue('txtSEQ');
                    filePXF051.STATION = win.getValue('txtSTATION');
                    filePXF051.CODE = win.getValue('txtCODE');
                    filePXF051.OPDT = win.getValue('txtOPDT');
                    filePXF051.OPTM = win.getValue('txtOPTM');
                    filePXF051.ST = win.getValue('txtST');
                    filePXF051.CLDT = win.getValue('txtCLDT');
                    filePXF051.CLTM = win.getValue('txtCLTM');
                    filePXF051.XTDT = win.getValue('txtXTDT');
                    filePXF051.XTTM = win.getValue('txtXTTM');
                    filePXF051.XTST = Number(win.getValue('txtXTST'));
                    filePXF051.VOIDS = Number(win.getValue('txtVOIDS'));
                    filePXF051.COMENT = win.getValue('txaComment');
                    
                    this.saveNewRecord(filePXF051);
                }
            }
        });
    },
    onUpdateClick: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Do you really want to update this transaction?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var filePXF051 = {};
                    filePXF051.WKSTAT = win.getValue('txtWKSTAT');
                    filePXF051.FREPOR = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFREPOR').getValue(), 'Ymd');
                    filePXF051.SEC = Number(win.getValue('txtSEC'));
                    filePXF051.BSEC = Number(win.getValue('txtBSEC'));
                    filePXF051.PSTATE = Number(win.getValue('rgpState').rgpState);
                    filePXF051.SEQ = win.getValue('txtSEQ');
                    filePXF051.STATION = win.getValue('txtSTATION');
                    filePXF051.CODE = win.getValue('txtCODE');
                    filePXF051.OPDT = win.getValue('txtOPDT');
                    filePXF051.OPTM = win.getValue('txtOPTM');
                    filePXF051.ST = win.getValue('txtST');
                    filePXF051.CLDT = win.getValue('txtCLDT');
                    filePXF051.CLTM = win.getValue('txtCLTM');
                    filePXF051.XTDT = win.getValue('txtXTDT');
                    filePXF051.XTTM = win.getValue('txtXTTM');
                    filePXF051.XTST = Number(win.getValue('txtXTST'));
                    filePXF051.VOIDS = Number(win.getValue('txtVOIDS'));
                    filePXF051.COMENT = win.getValue('txaComment');
                    
                    this.updateRecord(filePXF051);
                }
            }
        });
    },
    onDeleteClick: function () {
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="saveNewRecord">
    saveNewRecord: function(filePXF051) {
        Ext.Ajax.request({
            url: prototype.url + '/saveNewRecord',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(filePXF051)},
            beforerequest: Ext.getCmp('DataEntryTransactionConciliationASRForm').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp('DataEntryTransactionConciliationASRForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    
                } else global.Msg({ msg: res.sesion });
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp('DataEntryTransactionConciliationASRForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="updateRecord">
    updateRecord: function(filePXF051) {
        Ext.Ajax.request({
            url: prototype.url + '/updateRecord',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(filePXF051)},
            beforerequest: Ext.getCmp('DataEntryTransactionConciliationASRForm').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp('DataEntryTransactionConciliationASRForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    
                } else global.Msg({ msg: res.sesion });
                global.clear();
            },
            failure: function(response, opts) {
                Ext.getCmp('DataEntryTransactionConciliationASRForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    // </editor-fold>
    
    clearDty: function() {
        win.setValue('txtWKSTAT', '00000000');
        win.setValue('txtFREPOR', '');
        win.setValue('txtSEC', '0');
        win.setValue('txtBSEC', '0');
        win.setValue('txtSEQ', '');
        win.setValue('txtSTATION', '');
        win.setValue('txtCODE', '');
        win.setValue('txtOPDT', '');
        win.setValue('txtOPTM', '');
        win.setValue('txtST', '');
        win.setValue('txtCLDT', '');
        win.setValue('txtCLTM', '');
        win.setValue('txtXTDT', '');
        win.setValue('txtXTTM', '');
        win.setValue('txtXTST', '');
        win.setValue('txtVOIDS', '');
        win.setValue('txtTTRANS', '');
        win.setValue('txtDIFFERENCES', '');
        win.setValue('rgpState', '1');
        win.setValue('txaComment', '');
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});