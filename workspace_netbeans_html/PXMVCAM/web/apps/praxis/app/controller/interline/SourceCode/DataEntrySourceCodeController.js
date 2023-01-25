    Ext.define('Ext.Praxis.controller.interline.SourceCode.DataEntrySourceCodeController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySourceCodeController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    lstA1852: {},
    PERMISO: false,
    // </editor-fold>
    init: function(view) {
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.actionCode;
        this.bean = this.p.bean;
        this.lstA1852 = this.p.lstA1852;
        this.objPermiso = this.p.objPermiso;
    },
    afterRender: function(){
        meDE.PERMISO = win.validateAccess(this.objPermiso, this.actionCode);
        
        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-update').hide();
        Ext.getCmp(prototype.id + '-btn-delete').hide();
        Ext.getCmp(prototype.id + '-btn-cancel').show();
        
        switch (this.actionCode) {
            case 'A':
                this.HabilitarCampoClave();
                this.limpiarData();
                this.desHabilitartxt();
                this.Habilitarlbl1();
                if(meDE.PERMISO){
                    Ext.getCmp(prototype.id + '-btn-save').hide();
                }
                break;
            case 'M':
                this.DeshabilitarCampoClave();
                this.limpiarData();
                this.mostrarData();
                this.Habilitarlbl();
                this.desHabilitartxt();
                if(meDE.PERMISO){
                    Ext.getCmp(prototype.id + '-btn-update').show();
                    Ext.getCmp(prototype.id + '-btn-delete').show();
                }
                break;
        }
        // global.AccessControlMaganer();
    },
    mostrarData: function() {
        this.setValue('txtCODSOUR', this.bean.CODSOUR);
        this.setValue('txtDESSOU', this.bean.DESSOU);
        this.setValue('txtGRUSOR', this.bean.GRUSOR);
        this.setValue('txtstrGRUSOR', this.bean.strGRUSOR);
        Ext.getCmp(prototype.id + '-lblDescripcion').setText(this.bean.DESSOU);
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText(this.bean.strGRUSOR);
        
        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        beanTemp.CODSOUR = this.getValue("txtCODSOUR");
        beanTemp.DESSOU = this.getValue("lblDescripcion");
        beanTemp.DESSOU = this.getValue("txtDESSOU");
        beanTemp.GRUSOR = this.getValue("txtGRUSOR");
        beanTemp.strGRUSOR = this.getValue("lblDescripcion2");

        beanTemp.USCR = this.getValue("txtUSCR");
        beanTemp.FECR = this.getValue("txtFECR");
        beanTemp.HOCR = this.getValue("txtHOCR");
        beanTemp.USUP = this.getValue("txtUSUP");
        beanTemp.FEUP = this.getValue("txtFEUP");
        beanTemp.HOUP = this.getValue("txtHOUP");
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if(msjResult == ''){
                        beanTemp.option = 'I';
                        this.MaintenanceA1852(beanTemp);
                    }else{
                        global.Msg({ msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function(btn) {
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
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'I';
                    this.MaintenanceA1852(beanTemp);
                }
            }
        });
    },
    onDeleteClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.bean.option = 'I';
                    this.MaintenanceA1852(this.bean);
                }
            }
        });
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA1852: function(beanTemp) {
        Ext.Ajax.request({
            url: prototype.url+'/MaintenanceA1852',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
            beforerequest: Ext.getCmp('DataEntrySourceCodeForm').mask('Loading...'),
            success: function(response, opts){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    global.Msg({ msg: res.Mensaje });
                    Ext.getCmp('DataEntrySourceCodeForm').unmask();
                    meDE.view.close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    Ext.getCmp(prototype.id + '-btnAdd').fireEvent('click', {});
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntrySourceCodeForm').unmask();
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("txtCODSOUR")=='') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {
        Ext.getCmp(prototype.id + '-txtCODSOUR').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtDESSOU').setReadOnly(true);
    },
    HabilitarCampoClave: function() {
        Ext.getCmp(prototype.id + '-txtCODSOUR').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtDESSOU').setReadOnly(false);
    },
    Habilitarlbl: function() {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function() {
        if (this.getValue("txtGRUSOR") != this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function() {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR")=='') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    
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
//            this.btnSearch_click();
        }
    }
    // </editor-fold>
});