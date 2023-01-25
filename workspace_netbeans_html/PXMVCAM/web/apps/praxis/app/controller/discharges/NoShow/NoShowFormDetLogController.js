
Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormDetLogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id06 + '-noShowFormDetErrController',
    url: CONTEXTPATH + '/NoShow',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs    
        Ext.getCmp(prototype.id06 + '-TICKET_NUMBER').focus();
        this.get_load_grid_ticket_detLOG();
    },
    cmbfiltroSTAT_clickHandler: function () {
        this.get_load_grid_ticket_detLOG();
    },
    get_load_grid_ticket_detLOG: function () {

        var p = this.view.params;
        Ext.getCmp(prototype.id06 + '-A3980FFILE').setValue(Ext.util.Format.date(p.rec.data.A3933FPROC, 'Y/m/d'));                      
        var bean = {};
        bean.VP_A3980FFILE = Ext.util.Format.date(p.rec.data.A3933FPROC, 'Ymd');
        bean.VP_TICKET = Ext.getCmp(prototype.id06 + '-TICKET_NUMBER').getValue();
        bean.VP_SEQ = Ext.getCmp(prototype.id06 + '-SEQ').getValue();
        bean.VP_STAT = Ext.getCmp(prototype.id06 + '-STAT').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {
            proxy: {
                url: prototype.url + '/search_log_det'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id06 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id06 + '-paggin').setStore(storeGridDatas);
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id06 + '-NoShowFormDetLog').close();
    },
    onTxtFilterKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onsearchClick();
        }
    },
    onsearchClick: function (btn) {
        this.get_load_grid_ticket_detLOG();
    },
    ondoanlodTxtClick:function(){        
        var bean = {};
        bean.VP_A3980FFILE = Ext.util.Format.date( Ext.getCmp(prototype.id06 + '-A3980FFILE').getValue() , 'Ymd');
        bean.VP_TICKET = Ext.getCmp(prototype.id06 + '-TICKET_NUMBER').getValue();
        bean.VP_A3980SEQ = Ext.getCmp(prototype.id06 + '-SEQ').getValue();
        bean.VP_A3980APLIC = Ext.getCmp(prototype.id06 + '-STAT').getValue();
        //bean.limit = "-1";
        //bean.page = "-1";
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Plain Text',            
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                                            
                    global.getFile(prototype.url + '/downloadTextLog?VP_A3980FFILE='+bean.VP_A3980FFILE+'&VP_TICKET='+bean.VP_TICKET+'&VP_A3980SEQ='+bean.VP_A3980SEQ+'&VP_A3980APLIC='+bean.VP_A3980APLIC);
                }
            }
        });
    },
    ondoanlodExcelClick:function(){
        var bean = {};
        bean.VP_A3980FFILE = Ext.util.Format.date( Ext.getCmp(prototype.id06 + '-A3980FFILE').getValue() , 'Ymd');
        bean.VP_TICKET = Ext.getCmp(prototype.id06 + '-TICKET_NUMBER').getValue();
        bean.VP_A3980SEQ = Ext.getCmp(prototype.id06 + '-SEQ').getValue();
        bean.VP_A3980APLIC = Ext.getCmp(prototype.id06 + '-STAT').getValue();
        //bean.limit = "-1";
        //bean.page = "-1";
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel',            
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                                            
                    global.getFile(prototype.url + '/downloadExcelLog?VP_A3980FFILE='+bean.VP_A3980FFILE+'&VP_TICKET='+bean.VP_TICKET+'&VP_A3980SEQ='+bean.VP_A3980SEQ+'&VP_A3980APLIC='+bean.VP_A3980APLIC);
                }
            }
        });
    }
});
