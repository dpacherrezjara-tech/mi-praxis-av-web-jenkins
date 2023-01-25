Ext.define('Ext.Praxis.controller.payments.RejectionReport.DataEntryRejectionReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRejectionReportController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    A2288Filter: {},
    searchParams: {},
    me: '',
    mensaje: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
    },
    afterRender: function() {
        
        this.get_ClearField();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
//                me.bean= '';
                this.getData();
//                Ext.getCmp(prototype.id + '-btn-save').hide();
//                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
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

    // <editor-fold defaultstate="collapsed" desc="Botones">
    set_sendReporte: function() {
//        console.log('set_sendReporte');
        me.bean.CCUST = '139';
        me.bean.strMailTo = Ext.getCmp(prototype.id + '-txtMailTO').getValue();
        me.bean.strMailCC = Ext.getCmp(prototype.id + '-txtMailCC').getValue();
        me.bean.strMailSubject = Ext.getCmp(prototype.id + '-txtMailAsunto').getValue();
        me.bean.strMailText = me.mensaje;        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Send Mail ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.createPDF(me.bean);
                }
            }
        });
    },
    createPDF: function(bean2288) {
//        console.log('createPDF');
        var beanString = JSON.stringify(bean2288);

        Ext.Ajax.request({
            url: prototype.url + '/createPDF',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);                
                console.log(res);
                global.Msg({msg: res.info});
            }
        });
    },
    onCancelClick: function() {
        this.view.close();
    },
    // </editor-fold>

    getData: function() {
//        console.log('getData');
        this.get_ClearField();
        
        if(me.bean !== null){
            this.cargarDatosParaMail(me.bean);
        }else{
            global.Msg({msg: 'An error has ocurred. Call our Systems Department.'});
        }
    },
    cargarDatosParaMail: function(parm) {
        var beanString = JSON.stringify(parm);

        Ext.Ajax.request({
            url: prototype.url + '/cargarDatosParaMail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lst = res.lstData;
//                var mensaje = '';
                console.log(res);
                if (lst.length === 0) {
                    console.log('Data not found.');
                    me.mensaje = '';
                    me.mensaje = '\nEstimado(s):\n\nAnexo envío del archivo con el detalle de las transacciones rechazadas por filtros.\n';
                    me.mensaje += '\nAgradeciendo su atención, quedo a sus órdenes.\n\n Saludos\n\n';
                    Ext.getCmp(prototype.id + '-txtMensaje').setValue(me.mensaje);
                }else{
                    me.mensaje = '';
                    me.mensaje = '\nEstimado(s):\n\nAnexo envío del archivo con el detalle de las transacciones rechazadas por filtros.';
                    me.mensaje += '\nAgradeciendo su atención, quedo a sus órdenes.\nSaludos\n\n';
                    
                    for(var p = 0; p < lst.length; p++){
                        var file = lst[p];
                        me.mensaje += file.CODREJ + '-' + file.DESREJ + ' = ' + file.RN + ' Transaccion(es) Rechazada(s).\n';
                        me.bean.strFechaI = file.strFechaI;
                        me.bean.strFechaF = file.strFechaF;
                        me.bean.lngTotTrans = file.lngTotTrans;
                        me.bean.dblTotMonto = file.dblTotMonto;
                    }
                    Ext.getCmp(prototype.id + '-txtMensaje').setValue(me.mensaje);
                    Ext.getCmp(prototype.id + '-txtMailTO').setValue('amaclaracionescontracargos@aeromexico.com');
                    Ext.getCmp(prototype.id + '-txtMailAsunto').setValue('PROCESO RECHAZOS POR FILTROS (AEREOMEXICO)TPV/TEF DEL' + me.bean.strFechaI + ' AL ' + me.bean.strFechaF);
                }
            }
        });
    },
    
    get_ClearField: function() {
        Ext.getCmp(prototype.id + '-txtMailTO').setValue('');
        Ext.getCmp(prototype.id + '-txtMailCC').setValue('');
        Ext.getCmp(prototype.id + '-txtMailAsunto').setValue('');
    
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