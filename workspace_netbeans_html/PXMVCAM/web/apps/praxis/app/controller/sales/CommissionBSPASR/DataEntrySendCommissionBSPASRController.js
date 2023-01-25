Ext.define('Ext.Praxis.controller.sales.CommissionBSPASR.DataEntrySendCommissionBSPASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySendCommissionBSPASRController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        this.enableBtns();
    },
    afterRender: function() {
        this.p = this.view.params;
        this.get_data();
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(file) {
        this.setValue('txtA1775GSA2', file.A1775GSA);
        this.setValue('txtA1839RSOC', file.A1839RSOC);
        this.setValue('txtA1775LOTE', file.A1775LOTE);
        this.setValue('txtA1775FINI', file.PERIODRPTE);
        this.setValue('txtA1775PAIS2', file.A1775PAIS);
        this.setValue('txtA1839EMAIL', file.A1839EMAIL);
        this.setValue('txtEmailCcp', file.EmailCcp);
        this.setValue('txtAsunto', file.Asunto);
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        var data = this.p.data;
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_A1775CCUST: data.A1775CCUST,
            VP_A1775GSA: data.A1775GSA,
            VP_A1775PAIS: data.A1775PAIS,
            VP_A1775LOTE: data.A1775LOTE,
            VP_A1775MDALC: data.A1775MDALC
        };
        // </editor-fold>
    },
    setFormatParameterSendReport: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA1775GSA = this.getValue("txtA1775GSA");
        var txtA1775PAIS = this.getValue("txtA1775PAIS");
        var txtA1775LOTE = this.getValue("txtA1775LOTE");
        // </editor-fold>

        var data = this.p.data;
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_ACTION: 'U',
            VP_A1775CCUST: '139',
            VP_A1775GSA: txtA1775GSA,
            VP_A1775PAIS: txtA1775PAIS,
            VP_A1775LOTE: txtA1775LOTE,
            VP_A1775MDALC: data.A1775MDALC,
            VP_TIPO_ENVIO: '2'
        };
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="getSQP0089Filter">
    getSQP0089Filter: function() {
        Ext.Ajax.request({
            url: prototype.url + '/getSQP0089Filter',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp('DataEntrySendCommissionBSPASRForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstData = res.lstData;
                    if (lstData.length > 0) {
                        me.mostrarData(lstData[0]);
                    }
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntrySendCommissionBSPASRForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntrySendCommissionBSPASRForm').unmask();
            }
        });
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setSQP0083Filter">
    setSQP0083Filter: function() {
        this.disableBtns();
        Ext.Ajax.request({
            url: prototype.url + '/setSQP0083Filter',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp('DataEntrySendCommissionBSPASRForm').mask('Sending mail ... wait '),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.enableBtns();
                    global.Msg({
                        msg: res.MESSAGE
                    });
                    this.onCancelClick();
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntrySendCommissionBSPASRForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntrySendCommissionBSPASRForm').unmask();
            }
        });
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSendClick: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Send Mail ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.setFormatParameterSendReport();
                    this.setSQP0083Filter();
                }
            }
        });
    },
    onCancelClick: function() {
        this.view.close();
    },
    // </editor-fold>

    get_data: function() {
        this.get_ClearField();
        this.setFormatParameter();
        this.getSQP0089Filter();
    },
    get_ClearField: function() {
        this.setValue('txtA1775GSA2', '');
        this.setValue('txtA1839RSOC', '');
        this.setValue('txtA1775PAIS2', '');
        this.setValue('txtA1775LOTE', '');
        this.setValue('txtA1775FINI', '');
        this.setValue('txtA1839EMAIL', '');
        this.setValue('txtEmailCcp', '');
        this.setValue('txtAsunto', '');
    },
    enableBtns: function() {
        Ext.getCmp(prototype.id + '-btn-send').enable(true);
        Ext.getCmp(prototype.id + '-btn-cancel').enable(true);
    },
    disableBtns: function() {
        Ext.getCmp(prototype.id + '-btn-send').disable(true);
        Ext.getCmp(prototype.id + '-btn-cancel').disable(true);
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
// </editor-fold>
});