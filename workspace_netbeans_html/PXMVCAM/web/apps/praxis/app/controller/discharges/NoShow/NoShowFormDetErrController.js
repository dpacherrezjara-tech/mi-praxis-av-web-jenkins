
Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormDetErrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id05 + '-noShowFormDetErrController',
    url: CONTEXTPATH + '/NoShow',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs    
        Ext.getCmp(prototype.id05 + '-TICKET_NUMBER').focus();
        this.get_load_grid_ticket_detERR();
    },
    cmbfiltroSTAT_clickHandler: function () {
        this.get_load_grid_ticket_detERR();
    },
    get_load_grid_ticket_detERR: function () {

        var p = this.view.params;
        Ext.getCmp(prototype.id05 + '-A3933FPROC').setValue(Ext.util.Format.date(p.rec.data.A3933FPROC, 'Y/m/d'));                      
        var bean = {};
        bean.VP_A3934FPROC = Ext.util.Format.date(p.rec.data.A3933FPROC, 'Ymd');
        bean.VP_TICKET = Ext.getCmp(prototype.id05 + '-TICKET_NUMBER').getValue();
        bean.VP_SEQ = Ext.getCmp(prototype.id05 + '-SEQ').getValue();
        bean.VP_STAT = Ext.getCmp(prototype.id05 + '-STAT').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {
            proxy: {
                url: prototype.url + '/search_err_noshow'
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
        Ext.getCmp(prototype.id05 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id05 + '-paggin').setStore(storeGridDatas);
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id05 + '-NoShowFormDetErr').close();
    },
    onTxtFilterKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onsearchClick();
        }
    },
    onsearchClick: function (btn) {
        this.get_load_grid_ticket_detERR();
    }
});
