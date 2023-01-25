    Ext.define('Ext.Praxis.controller.salesaudit.ADMReasons.DataEntryADMReasonsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryADMReasonsController',
    meEntry: '',
    p: '',
    beanMant: {},
    gridDataAC: new Array(),
    init: function(view) {
        meEntry = this;
        this.p = this.view.params;
    },
    afterRender: function() {
        switch (this.p.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-txtCodReason').focus();
                Ext.getCmp(prototype.id + '-txtCodReason').setReadOnly(false);
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                break;
            case 'U':
                this.mostrarData();
                Ext.getCmp(prototype.id + '-txtCodReason').setReadOnly(true);
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }
    },
    busca: function (obj , e , eOpts){
        this.beanMant.VP_OPCION = 'B';
        this.beanMant.A2560CCUST = '139';
        this.beanMant.VP_CODRAZ = this.getValue("txtCodReason").trim();
        
        switch (e.getKey()) {
            case 13: case 9:
                this.searchCodReason(this.beanMant);
                break;
        }
    },
     busca2: function (obj , e , eOpts){
        this.beanMant.VP_OPCION = 'B';
        this.beanMant.A2560CCUST = '139';
        this.beanMant.VP_CODRAZ = this.getValue("txtCodReason").trim();
        if ( e.getKey() === e.ENTER || e.getKey() === e.TAB){
            this.searchCodReason(this.beanMant);
        }
    },
    mostrarData: function() {
        this.setValue('txtCodReason', this.p.beanBrow.A2560CODRZ.trim());
        this.setValue('txtFamilyName', this.p.beanBrow.A2560FAMIL.trim());
        this.setValue('txtCRelation', this.p.beanBrow.A2560COMRE.trim());
        this.setValue('txtCEs', this.p.beanBrow.A2560COMES.trim());
        this.setValue('txtCEng', this.p.beanBrow.A2560COMEN.trim());
        this.setValue('txtCPor', this.p.beanBrow.A2560COMPO.trim());
        this.setValue('txtCFre', this.p.beanBrow.A2560COMFR.trim());
        
        this.setValue('txtUSCR', this.p.beanBrow.A2560REGIS.trim());
        this.setValue('txtFECR', this.p.beanBrow.A2560FREGI.trim());
        this.setValue('txtHOCR', this.p.beanBrow.A2560HREGI.trim());
        this.setValue('txtUSUP', this.p.beanBrow.A2560REVIS.trim());
        this.setValue('txtFEUP', this.p.beanBrow.A2560FREVI.trim());
        this.setValue('txtHOUP', this.p.beanBrow.A2560HREVI.trim());
    },
    // <editor-fold defaultstate="collapsed" desc="button">
    btnInsert_clickHandler: function(btn) {
        this.beanMant.VP_OPCION = this.p.actionCode;
        this.beanMant.A2560CCUST = '139';
        this.beanMant.VP_CODRAZ = this.getValue("txtReason").trim();
        this.beanMant.A2560CODRZ= this.beanMant.VP_CODRAZ;
        this.beanMant.A2560FAMIL = this.getValue("txtFamilyName").trim();
        this.beanMant.A2560COMRE = this.getValue("txtCRelation").trim();
        this.beanMant.A2560COMES = this.getValue("txtCEs").trim();
        this.beanMant.A2560COMEN = this.getValue("txtCEng").trim();
        this.beanMant.A2560COMPO = this.getValue("txtCPor").trim();
        this.beanMant.A2560COMFR = this.getValue("txtCFre").trim();
        
        if ( this.beanMant.A2560CODRZ === '' ) {
            this.focus('txtCodReason');
            global.Msg({msg: 'Required Field, Cod.Reason'});
            return;
        } 
        if (  this.beanMant.A2560FAMIL === ''  ) {
            this.focus('txtFamilyName');
            global.Msg({msg: 'Required Field, Family Name'});
            return;
        }
        if ( this.beanMant.A2560COMRE === ''  ) {
            this.focus('txtCRelation');
            global.Msg({msg: 'Required Field, Comment Relation'});
            return;
        }

        if ( this.beanMant.A2560COMES === ''  ) {
            this.focus('txtCEs');
            global.Msg({msg: 'Required Field, Comment Description'});
            return;
        }
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.mantenimientoADM(this.beanMant);
                }
            }
        });
    },
    btnUpdate_clickHandler: function(btn) {
        this.beanMant.VP_OPCION = this.p.actionCode;
        this.beanMant.A2560CCUST = '139';
        this.beanMant.VP_CODRAZ = this.getValue("txtCodReason").trim();
        this.beanMant.A2560CODRZ= this.beanMant.VP_CODRAZ;
        this.beanMant.A2560FAMIL = this.getValue("txtFamilyName").trim();
        this.beanMant.A2560COMRE = this.getValue("txtCRelation").trim();
        this.beanMant.A2560COMES = this.getValue("txtCEs").trim();
        this.beanMant.A2560COMEN = this.getValue("txtCEng").trim();
        this.beanMant.A2560COMPO = this.getValue("txtCPor").trim();
        this.beanMant.A2560COMFR = this.getValue("txtCFre").trim();
        
        if (  this.beanMant.A2560FAMIL === ''  ) {
            this.focus('txtFamilyName');
            global.Msg({msg: 'Required Field, Family Name'});
            return;
        }
        if ( this.beanMant.A2560COMRE === ''  ) {
            this.focus('txtCRelation');
            global.Msg({msg: 'Required Field, Comment Relation'});
            return;
        }

        if ( this.beanMant.A2560COMES === ''  ) {
            this.focus('txtCEs');
            global.Msg({msg: 'Required Field, Comment Description'});
            return;
        }
        
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
                    this.mantenimientoADM(this.beanMant);
                }
            }
        });
    },
    btnDelete_clickHandler: function (btn) {
        this.beanMant.VP_OPCION = 'D';      	
        this.beanMant.VP_CODRAZ = this.getValue("txtCodReason").trim();
        
        Ext.Msg.show({
            title:'.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn){
                if (btn === 'yes'){
                    this.mantenimientoADM(this.beanMant);
                }
            }
        });
    },
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="searchCodReason">
    searchCodReason: function (beanMant) {
        Ext.Ajax.request({
            url: prototype.url + '/searchCodReason',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanMant)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEntry.gridDataAC = new Array();
                    meEntry.gridDataAC = res.listaData2;
                    console.log(meEntry.gridDataAC);
                    
                    if (meEntry.gridDataAC.length > 0) {
                        Ext.getCmp(prototype.id + '-txtReason').setValue(meEntry.gridDataAC[0].A2560CODRZ);
                        Ext.getCmp(prototype.id + '-txtFamilyName').setValue(meEntry.gridDataAC[0].A2560FAMIL);
                    } else {
                        global.Msg({msg: 'Data No Found.'});
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="mantenimientoADM">
    mantenimientoADM: function (beanMant) {
        Ext.Ajax.request({
            url: prototype.url + '/mantenimientoADM',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanMant)},
            beforerequest: Ext.getCmp('DataEntryADMReasonsForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryADMReasonsForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.MESSAGE,
                        buttons: Ext.MessageBox.YES,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'yes') {
                                if (res.SQLCODE === '0') {
                                    meEntry.btnCancel_clickHandler();
                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                } else {
                                    meEntry.afterRender();
                                }
                            }
                        }
                    });
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryADMReasonsForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnInsert_clickHandler();
        }
    }
    // </editor-fold>
});