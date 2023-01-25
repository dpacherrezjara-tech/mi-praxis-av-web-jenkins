Ext.define('Ext.Praxis.controller.interline.IATACalendar.DataEntryIATACalendarController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryIATACalendarController',
    meEntry: '',
    p: '',
    PERMISO: false,
    init: function(view) {
        meEntry = this;
        this.p = this.view.params;
        this.objPermiso = this.p.objPermiso;
    },
    afterRender: function(){
        meEntry.PERMISO = win.validateAccess(this.objPermiso, this.p.actionCode);
        Ext.getCmp(prototype.id + '-btnSave').hide();
        Ext.getCmp(prototype.id + '-btnUpdate').hide();
        Ext.getCmp(prototype.id + '-btnDelete').hide();
        
        switch (this.p.actionCode) {
            case "A":
                this.HabilitarCampoClave();
                if(meEntry.PERMISO){
                    Ext.getCmp(prototype.id + '-btnSave').show();
                }
                break;
            case "M":
                this.DeshabilitarCampoClave();
                this.mostrarData();
                if(meEntry.PERMISO){
                    Ext.getCmp(prototype.id + '-btnUpdate').show();
                }
//                Ext.getCmp(prototype.id + '-btnSave').hide();
//                Ext.getCmp(prototype.id + '-btnUpdate').hide();
//                Ext.getCmp(prototype.id + '-btnDelete').hide();
                break;
            case "V":
                this.DeshabilitarCampos();
                this.mostrarData();
                Ext.getCmp(prototype.id + '-btnSave').hide();
                Ext.getCmp(prototype.id + '-btnUpdate').hide();
                Ext.getCmp(prototype.id + '-btnDelete').hide();
                break;
        }
        // global.AccessControlMaganer();
    },
    //<editor-fold defaultstate="collapsed" desc="toolbar">
    onSaveClick: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        this.MaintenanceA1851(beanTemp, 'I');
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        this.MaintenanceA1851(beanTemp, 'U');
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1851">
    MaintenanceA1851: function (beanTemp, option) {
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA1851',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp), option: option},
            beforerequest: Ext.getCmp('DataEntryIATACalendarForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryIATACalendarForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.Mensaje;
                    global.Msg({msg: msj});
                    var bean = meEntry.p.bean;
                    meEntry.onCancelClick();
                    me.search(bean);
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryIATACalendarForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    mostrarData: function () {
        this.setValue('txtFINVOIC', this.p.bean.FINVOIC.trim());
        this.setValue('txtDOENV', this.p.bean.DOENV.trim());
        this.setValue('txtTIMESI', this.p.bean.TIMESI.trim());
        this.setValue('txtDCENV', this.p.bean.DCENV.trim());
        this.setValue('txtTIMESO', this.p.bean.TIMESO.trim());
        this.setValue('txtDENVI', this.p.bean.DENVI.trim());
        this.setValue('txtTIMESE', this.p.bean.TIMESE.trim());
        this.setValue('cmbPERIOD', this.p.bean.PERIOD.trim());
        this.setValue('txtStatus', this.p.bean.STVAL.trim());
    
        this.setValue('txtUSCR', this.p.bean.USCR.trim());
        this.setValue('txtFECR', this.p.bean.FECR.trim());
        this.setValue('txtHOCR', this.p.bean.HOCR.trim());
        this.setValue('txtUSUP', this.p.bean.USUP.trim());
        this.setValue('txtFEUP', this.p.bean.FEUP.trim());
        this.setValue('txtHOUP', this.p.bean.HOUP.trim());
    
    },
    llenarData: function (beanTemp) {
        beanTemp.FINVOIC= Ext.util.Format.date(this.getValue('txtFINVOIC'), 'Ym');
        beanTemp.PERIOD= this.getValue("cmbPERIOD");
        beanTemp.DOENV= Ext.util.Format.date(this.getValue('txtDOENV'), 'Ymd');
        beanTemp.TIMESI= this.getValue("txtTIMESI");
        beanTemp.DCENV= Ext.util.Format.date(this.getValue('txtDCENV'), 'Ymd');
        beanTemp.TIMESO= this.getValue("txtTIMESO");
        beanTemp.DENVI= Ext.util.Format.date(this.getValue('txtDENVI'), 'Ymd');
        beanTemp.TIMESE= this.getValue("txtTIMESE");
        beanTemp.STVAL= this.getValue("txtStatus");

        beanTemp.USCR = this.getValue("txtUSCR");
        beanTemp.FECR = this.getValue("txtFECR");
        beanTemp.HOCR = this.getValue("txtHOCR");
        beanTemp.USUP = this.getValue("txtUSUP");
        beanTemp.FEUP = this.getValue("txtFEUP");
        beanTemp.HOUP = this.getValue("txtHOUP");
    },
    validacionInsert: function (beanTemp) {
        var msjResult = '';
        
        if (Ext.util.Format.date(this.getValue('txtFINVOIC'), 'Ym').trim() === '') {
            msjResult = 'Invoice Date is a mandatory field.';
	}
	
	return  msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-txtFINVOIC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtFINVOIC').disable(true);
        Ext.getCmp(prototype.id + '-cmbPERIOD').disable(true);
    },
    HabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-txtFINVOIC').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtFINVOIC').enable(true);
        Ext.getCmp(prototype.id + '-cmbPERIOD').enable(true);
    },
    
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    }
});