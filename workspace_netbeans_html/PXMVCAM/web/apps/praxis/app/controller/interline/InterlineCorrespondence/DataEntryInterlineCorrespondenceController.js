    Ext.define('Ext.Praxis.controller.interline.InterlineCorrespondence.DataEntryInterlineCorrespondenceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInterlineCorrespondenceController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me1: '',
    p: {},
    actionCode: '',
    bean: {},
    // </editor-fold>
    init: function(view) {
        me1 = this;
        this.p = this.view.params;
        this.actionCode = this.p.actionCode;
        this.bean = this.p.bean;
    },
    afterRender: function(){
        switch (this.actionCode) {
            case 'I':
                this.HabilitarCampoClave();
                this.limpiarData();
                this.mostrarData();
                Ext.getCmp(prototype.id + '-btnSave').hide();
                Ext.getCmp(prototype.id + '-btnUpdate').show();
                Ext.getCmp(prototype.id + '-btnDelete').hide();
                break;
            case 'V':
                this.DeshabilitarCampoClave();
                this.limpiarData();
                this.mostrarData();
                Ext.getCmp(prototype.id + '-btnSave').hide();
                Ext.getCmp(prototype.id + '-btnUpdate').hide();
                Ext.getCmp(prototype.id + '-btnDelete').hide();
                break;
        }
        // global.AccessControlMaganer();
    },
    onUpdateClick: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    this.MaintenanceA020(beanTemp, 'U');
                }
            }
        });
    },
    MaintenanceA020: function (beanTemp, option) {
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    mostrarData: function () {
        Ext.getCmp(prototype.id + '-lblEstado').setText('Status : '+this.bean.strDescripcion);
        Ext.getCmp(prototype.id + '-txtA020KEY').setValue(this.bean.A020KEY);
        Ext.getCmp(prototype.id + '-txtCod1').setValue(this.bean.A020CODOB1);
        Ext.getCmp(prototype.id + '-txtCod2').setValue(this.bean.A020CODOB2);
        Ext.getCmp(prototype.id + '-txtCod3').setValue(this.bean.A020CODOB3);
        Ext.getCmp(prototype.id + '-txtCod4').setValue(this.bean.A020CODOB4);
        Ext.getCmp(prototype.id + '-txtCod5').setValue(this.bean.A020CODOB5);
        
        Ext.getCmp(prototype.id + '-txtObs1').setValue(this.bean.A020COMME1);
        Ext.getCmp(prototype.id + '-txtObs2').setValue(this.bean.A020COMME2);
        Ext.getCmp(prototype.id + '-txtObs3').setValue(this.bean.A020COMME3);
        Ext.getCmp(prototype.id + '-txtObs4').setValue(this.bean.A020COMME4);
        Ext.getCmp(prototype.id + '-txtObs5').setValue(this.bean.A020COMME5);
        Ext.getCmp(prototype.id + '-txtObs6').setValue(this.bean.A020COMME6);
    },
    HabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-txtCod1').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtObs1').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCod2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtObs2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCod3').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtObs3').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCod4').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtObs4').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCod5').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtObs5').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtObs6').setReadOnly(false);
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-txtCod1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtObs1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCod2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtObs2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCod3').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtObs3').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCod4').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtObs4').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCod5').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtObs5').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtObs6').setReadOnly(true);
    },
    limpiarData: function () {
        Ext.getCmp(prototype.id + '-lblEstado').setText('');
        Ext.getCmp(prototype.id + '-txtA020KEY').setValue('');
        Ext.getCmp(prototype.id + '-txtObs1').setValue('');
        Ext.getCmp(prototype.id + '-txtObs2').setValue('');
        Ext.getCmp(prototype.id + '-txtObs3').setValue('');
        Ext.getCmp(prototype.id + '-txtObs4').setValue('');
        Ext.getCmp(prototype.id + '-txtObs5').setValue('');
        Ext.getCmp(prototype.id + '-txtObs1').setValue('');
        Ext.getCmp(prototype.id + '-txtObs2').setValue('');
        Ext.getCmp(prototype.id + '-txtObs3').setValue('');
        Ext.getCmp(prototype.id + '-txtObs4').setValue('');
        Ext.getCmp(prototype.id + '-txtObs5').setValue('');
        Ext.getCmp(prototype.id + '-txtObs6').setValue('');
    }
});