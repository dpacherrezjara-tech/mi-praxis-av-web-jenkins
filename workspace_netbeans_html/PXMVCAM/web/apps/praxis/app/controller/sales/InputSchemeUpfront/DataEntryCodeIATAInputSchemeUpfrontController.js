Ext.define('Ext.Praxis.controller.sales.InputSchemeUpfront.DataEntryCodeIATAInputSchemeUpfrontController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCodeIATAInputSchemeUpfrontController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    actionCode: '',
    TM: '',
    bean: {},
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        this.p = this.view.params;
        this.actionCode = this.p.actionCode;
        this.TM = this.p.TM;
        this.bean = this.p.bean;
    },
    afterRender: function(){
        this.setClearTxt();
    },
    getListGroup: function() {
        this.setClearStore();
        var objPSA00004 = {};
        objPSA00004.A2649INDAC=this.TM;
        var cmbIATA = this.getValue('cmbIATA');
        if (cmbIATA === 'I') {
            objPSA00004.A003KEY3='';                                                                                                                                                                                                                                                                                                                       
            objPSA00004.A2649IATA=this.getValue('textSearchList');
            objPSA00004.A2649KGRUP='';
        } else if (cmbIATA === 'N') {
            objPSA00004.A2649IATA='';
            objPSA00004.A003KEY3=this.getValue('textSearchList');
            objPSA00004.A2649KGRUP='';
        } else {
            objPSA00004.A003KEY3='';                                                                                                                                                                                                                                                                                                                       
            objPSA00004.A2649IATA='';
            objPSA00004.A2649KGRUP=this.getValue('textSearchList');
        }
        this.getGROUPIATA(objPSA00004);
    },
    getGROUPIATA: function(objPSA00004) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataGROUPIATA', {
            proxy: {
                url: prototype.url+'/getGROUPIATA'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = objPSA00004;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    me.focus('textSearchList');
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridGROUPLIST').bindStore(storeGridDatas);
    },
    selectedData: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var objPSA00004 = {};
        objPSA00004.VP_ACTION='I';
        objPSA00004.VP_INDAC='U';
        objPSA00004.VP_IATA=data.A2649IATA;
        objPSA00004.VP_CODE= this.bean.A1155CODAC;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.setGROUPCODE(objPSA00004);
                }
            }
        });
    },
    setGROUPCODE: function(objPSA00004) {
        Ext.Ajax.request({
            url: prototype.url+'/setGROUPCODE',
            method: 'POST',
            timeout: 60000000,
            params: objPSA00004,
            beforerequest: Ext.getCmp(prototype.id + '-gridGROUPLIST').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstArray = res.response;
                    var objPSA00004 = lstArray[0];
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: objPSA00004.OU_MESSAGE,
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                if(objPSA00004.OU_SQLCODE==='0'){
                                    me.getListGroup();
                                    Ext.getCmp(prototype.id + '-btnSearch2').fireEvent('click', {});
                                }
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp(prototype.id + '-gridGROUPLIST').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-gridGROUPLIST').unmask();
            }
        });
    },
    setClearTxt: function() {
        this.setValue('textSearchList', '');
        this.focus('textSearchList');
    },
    onTextSearchListKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.getListGroup();
        }
    },
    setClearStore: function() {
        Ext.getCmp(prototype.id+'-gridGROUPLIST').getStore().removeAll();
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
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});