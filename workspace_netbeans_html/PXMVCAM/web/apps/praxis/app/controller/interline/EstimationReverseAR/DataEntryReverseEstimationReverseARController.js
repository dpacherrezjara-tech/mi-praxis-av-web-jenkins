Ext.define('Ext.Praxis.controller.interline.EstimationReverseAR.DataEntryReverseEstimationReverseARController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryReverseEstimationReverseARController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me3: '',
    p: {},
    listaReversaEstimado: new Array(),
    // </editor-fold>
    init: function(view) {
        me3 = this;
        this.p = this.view.params;
    },
    afterRender: function(){
        switch( this.p.actionCode ){
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                this.limpiarData();
                break;
        }
        // global.AccessControlMaganer();
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    btnInsert_clickHandler: function () {
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
                        this.llenarData();
                        this.reversaPrueba(this.listaReversaEstimado);
                    }
                }
            });
        } else {
            global.Msg({msg: 'Insert fields required.'});
        }
    },
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="reversaPrueba">
    reversaPrueba: function (listaReversaEstimado) {
        Ext.Ajax.request({
            url: prototype.url + '/Reversa',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(listaReversaEstimado)},
            beforerequest: Ext.getCmp('DataEntryReverseEstimationReverseARForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryReverseEstimationReverseARForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.tipoDownload = 'X';
                    me.mensaje = res.intResult;
                    me3.view.close();
                    me.resultadoDownload('A2138');
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryReverseEstimationReverseARForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    limpiarData: function () {
        this.setValue('txtAccountingDate2', '');
    },
    llenarData: function () {
        this.listaReversaEstimado = new Array();
        for (var i = 0; i < this.p.listReversaGrupo.length; i++) {
            var beanOption = {};
            beanOption.IN_A2111GRUPO = this.p.listReversaGrupo[i].A2111GRUPO;
            beanOption.IN_A2111FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate2'), 'Ymd');
            beanOption.IN_A2111FPROC = this.p.listReversaGrupo[i].A2111FPROC;
            
            this.listaReversaEstimado.push(beanOption);
        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        if (Ext.util.Format.date(this.getValue('txtAccountingDate2'), 'Ymd') === '') {
            bvalida = false;
        }
        return bvalida;
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
    }
    // </editor-fold>
});