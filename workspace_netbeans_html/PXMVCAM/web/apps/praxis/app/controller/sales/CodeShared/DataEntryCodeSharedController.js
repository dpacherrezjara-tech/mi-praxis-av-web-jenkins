Ext.define('Ext.Praxis.controller.sales.CodeShared.DataEntryCodeSharedController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCodeSharedController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    lblA766AIRLIN: '',
    lblA766CARRIE: '',
    lblA766VLOINI: '',
    lblA766VLOFIN: '',
    lblA766EFF: '',
    lblA766DIS: '',
    // </editor-fold>
    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.mostrarData(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtAirline').focus();
                break;
        }
        // global.AccessControlMaganer();
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        Ext.getCmp(prototype.id + '-txtAirline').setValue(rec.get('A766AIRLIN'));
        Ext.getCmp(prototype.id + '-txtCarrier').setValue(rec.get('A766CARRIE'));
        Ext.getCmp(prototype.id + '-txtBeginFlight2').setValue(rec.get('A766VLOINI'));
        Ext.getCmp(prototype.id + '-txtEndFlight2').setValue(rec.get('A766VLOFIN'));
        Ext.getCmp(prototype.id + '-txtVigencyFrom').setValue(rec.get('A766EFF'));
        Ext.getCmp(prototype.id + '-txtVigencyTo').setValue(rec.get('A766DIS'));
        Ext.getCmp(prototype.id + '-txtCiaCode').setValue(rec.get('A766CIANUM'));
        Ext.getCmp(prototype.id + '-txtCiaName').setValue(rec.get('A766CIALIT'));
        Ext.getCmp(prototype.id + '-txtFlightNumber').setValue(rec.get('A766VLOOP'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A766UINGRE'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A766FINGRE'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A766HINGRE'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A766UMODI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A766FMODI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A766HMODI'));
        
        this.lblA766AIRLIN = rec.get('A766AIRLIN');
        this.lblA766CARRIE = rec.get('A766CARRIE');
        this.lblA766VLOINI = rec.get('A766VLOINI');
        this.lblA766VLOFIN = rec.get('A766VLOFIN');
        this.lblA766EFF = rec.get('A766EFF');
        this.lblA766DIS = rec.get('A766DIS');
    },
    // </editor-fold>
    
    validaRequiredFields: function() {
        var txtAirline = Ext.getCmp(prototype.id + '-txtAirline').getValue();
        if (txtAirline==="") {
            Ext.getCmp(prototype.id + '-txtAirline').focus();
            this.msjAlert = "";
            return false;
        }
        var txtCarrier = Ext.getCmp(prototype.id + '-txtCarrier').getValue();
        if (txtCarrier ==="") {
            Ext.getCmp(prototype.id + '-txtCarrier').focus();
            this.msjAlert = "";
            return false;
        }
        var txtBeginFlight = Ext.getCmp(prototype.id + '-txtBeginFlight').getValue();
        if (txtBeginFlight ==="") {
            Ext.getCmp(prototype.id + '-txtBeginFlight').focus();
            this.msjAlert = "";
            return false;
        }
        var txtEndFlight = Ext.getCmp(prototype.id + '-txtEndFlight').getValue();
        if (txtEndFlight ==="") {
            Ext.getCmp(prototype.id + '-txtEndFlight').focus();
            this.msjAlert = "";
            return false;
        }
        var txtVigencyFrom = Ext.getCmp(prototype.id + '-txtVigencyFrom').getValue();
        if (txtVigencyFrom ==="") {
            Ext.getCmp(prototype.id + '-txtVigencyFrom').focus();
            this.msjAlert = "";
            return false;
        }
        var txtVigencyTo = Ext.getCmp(prototype.id + '-txtVigencyTo').getValue();
        if (txtVigencyTo ==="") {
            Ext.getCmp(prototype.id + '-txtVigencyTo').focus();
            this.msjAlert = "";
            return false;
        }
        return true;
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function(btn) {
        if (this.validaRequiredFields()) {
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
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        if (this.validaRequiredFields()) {
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
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
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
    // </editor-fold>
    
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.intResult;
                    var icon=1;
                    if(msg==='DUPLICATE KEY, VERIFY!'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            Ext.getCmp('DataEntryCodeSharedForm').close(),
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            }
        });
    }
    ,
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var txtAirline = Ext.getCmp(prototype.id + '-txtAirline').getValue();
        var txtCarrier = Ext.getCmp(prototype.id + '-txtCarrier').getValue();
        var txtBeginFlight = Ext.getCmp(prototype.id + '-txtBeginFlight').getValue();
        var txtEndFlight = Ext.getCmp(prototype.id + '-txtEndFlight').getValue();
        var txtVigencyFrom = Ext.getCmp(prototype.id + '-txtVigencyFrom').getValue();
        var txtVigencyTo = Ext.getCmp(prototype.id + '-txtVigencyTo').getValue();
        var txtCiaCode = Ext.getCmp(prototype.id + '-txtCiaCode').getValue();
        var txtCiaName = Ext.getCmp(prototype.id + '-txtCiaName').getValue();
        var txtFlightNumber = Ext.getCmp(prototype.id + '-txtFlightNumber').getValue();
        var txtOrig = Ext.getCmp(prototype.id + '-txtOrig').getValue();
        var txtDest = Ext.getCmp(prototype.id + '-txtDest').getValue();
        
        return {
            strOption: strOption,
            A766AIRLIN: txtAirline,
            A766CARRIE: txtCarrier,
            A766VLOINI: txtBeginFlight,
            A766VLOFIN: txtEndFlight,
            A766EFF: txtVigencyFrom,
            A766DIS: txtVigencyTo,
            A766CIANUM: txtCiaCode,
            A766CIALIT: txtCiaName,
            A766VLOOP: txtFlightNumber,
            A766ORIG: txtOrig,
            A766DEST: txtDest,
            IN_A766AIRLIN_OLD: this.lblA766AIRLIN,
            IN_A766CARRIE_OLD: this.lblA766CARRIE,
            IN_A766VLOINI_OLD: this.lblA766VLOINI,
            IN_A766VLOFIN_OLD: this.lblA766VLOFIN,
            IN_A766EFF_OLD: this.lblA766EFF,
            IN_A766DIS_OLD: this.lblA766DIS
        };
    }
});