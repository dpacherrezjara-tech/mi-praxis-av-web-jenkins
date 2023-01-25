Ext.define('Ext.Praxis.controller.sales.GranPlanProcessed.DataEntryAddGranPlanProcessedController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAddGranPlanProcessedController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                this.focus('txtA720FORMA');
                break;
        }
    },
    onSearchTktGpClick: function() {
        this.llenarData();
        if (this.validaRequiredFields()) {
            this.get_SQP00169();
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        this.setValue('txtA1530AGENT', data.A1530AGENT);
        this.setValue('txtA1530AGENT_0', data.A003KEY3);
        this.setValue('txtA1530GRUPO', data.A1530GRUPO);
        this.setValue('txtA1530IDFIL', data.A1530IDFIL);
        this.setValue('txtA1530MDA', data.A1530MDA);
        this.setValue('txtA720FECVTA', data.A720FECVTA);
        this.setValue('txtA720PNR', data.A720PNR);
        this.setValue('txtA720FARERV', Ext.util.Format.number(data.A720FARERV, '0,000.00'));
        this.setValue('txtA720TKT', data.A720CIA+data.A720FORMA+data.A720SERIE);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA720CIA = this.getValue("txtA720CIA");
        var txtA720FORMA = this.getValue("txtA720FORMA");
        var txtA720SERIE = this.getValue("txtA720SERIE");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_CIA: txtA720CIA,
            VP_FORMA: txtA720FORMA,
            VP_SERIE: txtA720SERIE
        };
        // </editor-fold>
    },
    llenarDataSave: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA720CIA = this.getValue("txtA720CIA");
        var txtA720FORMA = this.getValue("txtA720FORMA");
        var txtA720SERIE = this.getValue("txtA720SERIE");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_ACTION: this.p.action,
            VP_CIA: txtA720CIA,
            VP_FORMA: txtA720FORMA,
            VP_SERIE: txtA720SERIE
        };
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        var p = this.view.params;
        this.llenarDataSave();
        if (this.validaRequiredFieldsSave()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Add ticked to GP ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.set_SQP00168();
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
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Ext.Ajax.request">
    // <editor-fold defaultstate="collapsed" desc="get_SQP00169">
    get_SQP00169: function() {
        Ext.Ajax.request({
            url: prototype.url+'/get_SQP00169',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lst_tkt = res.lst_tkt;
                    if (lst_tkt.length>0) {
                        var data = lst_tkt[0];
                        me.mostrarData(data);
                    } else {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="set_SQP00168">
    set_SQP00168: function() {
        Ext.Ajax.request({
            url: prototype.url + '/set_SQP00168',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.MESSAGE;
                    var icon=1;
                    if(msg==='DUPLICATE KEY, VERIFY!'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            me.onCancelClick();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    // </editor-fold>
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="validaRequiredFields">
    validaRequiredFields: function() {
        if (searchParams.VP_FORMA.length!==4) {
            this.msjAlert = 'Invalid ticket Number';
            this.focus('txtA720FORMA');
            return false;
        }
        if (searchParams.VP_SERIE.length!==6) {
            this.msjAlert = 'Invalid ticket Number';
            this.focus('txtA720SERIE');
            return false;
        }
        return true;
    },
    validaRequiredFieldsSave: function() {
        if (searchParams.VP_FORMA.length!==4) {
            this.msjAlert = 'Invalid ticket Number';
            this.focus('txtA720FORMA');
            return false;
        }
        if (searchParams.VP_SERIE.length!==6) {
            this.msjAlert = 'Invalid ticket Number';
            this.focus('txtA720SERIE');
            return false;
        }
        if (this.getValue('txtA720TKT')==='') {
            this.msjAlert = 'Ticket Not found';
            this.focus('txtA720FORMA');
            return false;
        }
        return true;
    },
    // </editor-fold>
    
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
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});