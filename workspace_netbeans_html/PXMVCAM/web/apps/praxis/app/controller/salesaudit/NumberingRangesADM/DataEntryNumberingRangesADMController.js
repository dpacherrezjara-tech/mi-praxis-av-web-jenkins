    Ext.define('Ext.Praxis.controller.salesaudit.NumberingRangesADM.DataEntryNumberingRangesADMController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryNumberingRangesADMController',
    beanBrow: {},
    actionCode: 'V',
    filtro: '',
    beanMant: {},
    init: function(view) {
    },
    afterRender: function(){
        switch(this.actionCode){
            case 'V':
                this.mostrarData();
                Ext.getCmp(prototype.id+'-1-txtPais').setReadOnly(false);
                Ext.getCmp(prototype.id+'-1-txtCountryName').setReadOnly(false);
                win.visible('1-btn-save', false);
                win.visible('1-btn-update', false);
                win.visible('1-btn-delete', false);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-1-txtPais').setReadOnly(false);
                Ext.getCmp(prototype.id+'-1-txtCountryName').setReadOnly(false);
                Ext.getCmp(prototype.id+'-1-txtCurrent').setReadOnly(true);
                win.visible('1-btn-save', true);
                win.visible('1-btn-update', false);
                win.visible('1-btn-delete', false);
                win.focus('1-txtPais');
                break;
            case 'U':
                this.mostrarData();
                Ext.getCmp(prototype.id+'-1-txtPais').setReadOnly(true);
                Ext.getCmp(prototype.id+'-1-txtCountryName').setReadOnly(true);
                Ext.getCmp(prototype.id+'-1-txtCurrent').setReadOnly(false);
                win.visible('1-btn-save', false);
                win.visible('1-btn-update', true);
                win.visible('1-btn-delete', true);
                break;
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    mostrarData: function () {
        win.setValue('1-txtPais', this.beanBrow.A2563PAIS.trim());
        win.setValue('1-txtCountryName', this.beanBrow.A2563NPAIS.trim());
        win.setValue('1-txtinitial', this.beanBrow.A2563RINI.trim());
        win.setValue('1-txtending', this.beanBrow.A2563RFIN.trim());
        win.setValue('1-txtCurrent', this.beanBrow.A2563ADMAC.trim());
        win.setValue('1-txtType', this.beanBrow.A2563TYPE.trim());
        
        win.setValue('1-txtREGIS', this.beanBrow.A2563REGIS.trim());
        win.setValue('1-txtFREGI', this.beanBrow.A2563FREGI.trim());
        win.setValue('1-txtHREGI', this.beanBrow.A2563HREGI.trim());
        win.setValue('1-txtREVIS', this.beanBrow.A2563REVIS.trim());
        win.setValue('1-txtFREVI', this.beanBrow.A2563FREVI.trim());
        win.setValue('1-txtHREVI', this.beanBrow.A2563HREVI.trim());
    },
    //<editor-fold defaultstate="collapsed" desc="button">
    btnInsert_clickHandler: function () {
        this.beanMant.VP_OPCION = this.actionCode;
        this.beanMant.A2563CCUST = '139';
        this.beanMant.VP_PAIS  = win.getValue('1-txtPais').trim();
        this.beanMant.A2563PAIS  = this.beanMant.VP_PAIS;
        this.beanMant.A2563TYPE = win.getValue('1-txtType').trim();
        this.beanMant.A2563NPAIS = win.getValue('1-txtCountryName').trim();
        
        this.beanMant.A2563RINI = win.getValue('1-txtinitial').trim();
        this.beanMant.A2563RFIN = win.getValue('1-txtending').trim(); 

        if (this.beanMant.A2563PAIS === ''){
            win.focus('1-txtPais');
            global.Msg({msg: 'Required Field, Cod.Country'});
            return;
        }
        if (this.beanMant.A2563TYPE === ''){
            win.focus('1-txtType');
            global.Msg({msg: 'Required Field, Type'});
            return;
        }
        if (this.beanMant.A2563NPAIS === ''){
            win.focus('1-txtCountryName');
            global.Msg({msg: 'Required Field, Country Name'});
            return;
        }
        if (this.beanMant.A2563RINI === ''){
            win.focus('1-txtinitial');
            global.Msg({msg: 'Required Field, Initial'});
            return;
        }
        if (this.beanMant.A2563RFIN === ''){
            win.focus('1-txtending');
            global.Msg({msg: 'Required Field, Ending'});
            return;
        }
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert? ',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoRange(this.beanMant);
                }
            }
        });
    },
    btnUpdate_clickHandler: function () {
        this.beanMant.VP_OPCION = this.actionCode;
        this.beanMant.VP_PAIS  = win.getValue('1-txtPais').trim();
        this.beanMant.A2563PAIS = this.beanMant.VP_PAIS;
        this.beanMant.A2563RINI   = win.getValue('1-txtinitial').trim();
        this.beanMant.A2563RFIN   = win.getValue('1-txtending').trim(); 
        this.beanMant.A2563ADMAC   = win.getValue('1-txtCurrent').trim();
        this.beanMant.A2563TYPE   = win.getValue('1-txtType').trim();
        
        if (this.beanMant.A2563RINI === ''){
            win.focus('1-txtinitial');
            global.Msg({msg: 'Required Field, Initial'});
            return;
        }
        if (this.beanMant.A2563RFIN === ''){
            win.focus('1-txtending');
            global.Msg({msg: 'Required Field, Ending'});
            return;
        }
        if (this.beanMant.A2563TYPE === ''){
            win.focus('1-txtType');
            global.Msg({msg: 'Required Field, Type'});
            return;
        }
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoRange(this.beanMant);
                }
            }
        });
    },
    btnDelete_clickHandler: function () {
        this.beanMant.VP_OPCION = 'D';
        this.beanMant.VP_PAIS = win.getValue('1-txtPais').trim();
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoRange(this.beanMant);
                }
            }
        });
    },
    onCancelClick: function () {
        this.view.close();
    },
    //</editor-fold>
    
    execSearch: function () {
        this.beanBrow.VP_OPCION='';
        this.beanBrow.VP_PAIS='';
        if(this.filtro ===''){
            this.beanBrow.VP_OPCION='';
        } else {
            this.beanBrow.VP_OPCION='P';
            this.beanBrow.VP_PAIS = this.filtro;
        }
        me.search(this.beanBrow);
    },
    
    //<editor-fold defaultstate="collapsed" desc="mantenimientoRange">
    mantenimientoRange: function (beanMant) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.url + '/mantenimientoRange',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanMant)},
            beforerequest: Ext.getCmp('DataEntryNumberingRangesADMForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryNumberingRangesADMForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.SQLCODE,
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'yes') {
                                if (res.SQLCODE === '0') {
                                    me1.execSearch();
                                    me1.view.close();
                                } else {
                                    me1.afterRender();
                                }
                            }
                        }
                    });
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryNumberingRangesADMForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

});