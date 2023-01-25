
Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormDetXmlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id02 + '-noShowFormDetXmlController',
    url: CONTEXTPATH + '/NoShow',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //Initialize INPUTs    
        Ext.getCmp(prototype.id02 + '-TICKET_NUMBER').focus();
        this.get_load_grid_ticket_detXML();
    },
    cmbfiltroSTAT_clickHandler: function () {
        this.get_load_grid_ticket_detXML();
    },
    get_load_grid_ticket_detXML: function () {

        var p = this.view.params;

        Ext.getCmp(prototype.id02 + '-A3933FPROC').setValue(Ext.util.Format.date(p.rec.data.A3933FPROC, 'Y/m/d'));
        //Ext.getCmp(prototype.id02 + '-A3933TRECI').setValue(Ext.util.Format.number(p.rec.data.A3933TRECI, '0,000'));
        //Ext.getCmp(prototype.id02 + '-A3933TARCH').setValue(Ext.util.Format.number(p.rec.data.A3933TARCH, '0,000'));
        //Ext.getCmp(prototype.id02 + '-A3933RANGF').setValue(p.rec.data.A3933RANGF);
        //console.log(p);                
        var bean = {};
        bean.VP_FPROC = Ext.util.Format.date(p.rec.data.A3933FPROC, 'Ymd');
        bean.VP_TICKET = Ext.getCmp(prototype.id02 + '-TICKET_NUMBER').getValue();
        bean.VP_SEQ = Ext.getCmp(prototype.id02 + '-SEQ').getValue();
        bean.VP_STAT = Ext.getCmp(prototype.id02 + '-STAT').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {
            proxy: {
                url: prototype.url + '/search_XML_ticket'
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
        Ext.getCmp(prototype.id02 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id02 + '-paggin').setStore(storeGridDatas);
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id02 + '-NoShowFormDetXml').close();
    },
    onDetailClick_viewXml: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    onDetailClick_viewXmlTicket: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry01('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.discharges.NoShowForm.NoShowFormViewXml', {
            id: prototype.id03 + '-NoShowFormViewXml',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
     winDataEntry01: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.discharges.NoShowForm.NoShowFormDetXmlTicket', {
            id: prototype.id04 + '-NoShowFormDetXmlTicket',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    onTxtFilterKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onsearchClick();
        }
    },
    onsearchClick: function (btn) {
        this.get_load_grid_ticket_detXML();
    },
    onDonwloadExcelClick: function(){        
        var bean = {};
        bean.VP_A3935FPROC = Ext.util.Format.date( Ext.getCmp(prototype.id02 + '-A3933FPROC').getValue(), 'Ymd');
         Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel',            
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                                            
                    global.getFile(prototype.url + '/DonwloadExcelDetXml?VP_A3935FPROC='+bean.VP_A3935FPROC);
                }
            }
        });
        
    }
    
});
