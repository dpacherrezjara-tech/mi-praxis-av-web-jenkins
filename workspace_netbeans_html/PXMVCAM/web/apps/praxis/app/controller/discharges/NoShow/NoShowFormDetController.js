
Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormDetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id01 + '-noShowFormDetController',
    url: CONTEXTPATH + '/NoShow',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs   
        Ext.getCmp(prototype.id01 + '-TICKET_NUMBER').focus();
        this.get_load_grid_ticket_det();
    },
    onsearchClick: function (btn) {
        this.get_load_grid_ticket_det();
    },
    cmbfiltroSTAT_clickHandler: function () {
        this.get_load_grid_ticket_det();
    },
    onTxtFilterKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onsearchClick();
        }
    },
    get_load_grid_ticket_det: function () {

        var p = this.view.params;

        Ext.getCmp(prototype.id01 + '-A3933FPROC').setValue(Ext.util.Format.date(p.rec.data.A3933FPROC, 'Y/m/d'));
        //Ext.getCmp(prototype.id01 + '-A3933TRECI').setValue(Ext.util.Format.number(p.rec.data.A3933TRECI, '0,000'));
        //Ext.getCmp(prototype.id01 + '-A3933TARCH').setValue(Ext.util.Format.number(p.rec.data.A3933TARCH, '0,000'));
        //Ext.getCmp(prototype.id01 + '-A3933RANGF').setValue(p.rec.data.A3933RANGF);
        //console.log(p);                
        var bean = {};
        bean.VP_A3932RPDA = Ext.util.Format.date(p.rec.data.A3933FPROC, 'Ymd');
        bean.VP_TICKET = Ext.getCmp(prototype.id01 + '-TICKET_NUMBER').getValue();
        bean.VP_SEQ = Ext.getCmp(prototype.id01 + '-SEQ').getValue();
        bean.VP_STAT = Ext.getCmp(prototype.id01 + '-STAT').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {
            proxy: {
                url: prototype.url + '/search_detalle_noshow'
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
        Ext.getCmp(prototype.id01 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id01 + '-paggin').setStore(storeGridDatas);
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id01 + '-NoShowFormDet').close();
    }

});
