
Ext.define('Ext.Praxis.controller.payments.AccountingPlan.AccountingPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingPlanController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    searchParams: {},
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'AccountingPlanForm';
        prototype.url = CONTEXTPATH + '/AccountingPlan';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#AccountingPlanForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#AccountingPlanForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingPlanForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingPlanForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingPlanForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingPlanForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingPlanForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingPlanForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingPlanForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingPlanForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingPlanForm-btn-pag-last': {
                click: this.pagLast
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    
    obtainData: function () {

        var cmbTrans = Ext.getCmp(prototype.id + '-cmbTrans');
        cmbTrans.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01-Comisiones Regulares"],
                ["02", "02-Comisiones Parciales"],
                ["03", "03-IVA"],
                ["04", "04-Reembolsos"],
                ["06", "06-Contracargos"],
                ["07", "07-Deposito Fideicomiso"]
            ]
        }));
        cmbTrans.setValue("");

        var cmbTReg = Ext.getCmp(prototype.id + '-cmbTReg');
        cmbTReg.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["A", "Abono"],
                ["C", "Cargo"]
            ]
        }));
        cmbTReg.setValue("");
        
        this.dataObtain.COUNTRY = 2;
        this.dataObtain.BANK = 1;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);             
                if (res.success) {
                    me.lstCountry = res.lstCountry;
                    me.lstBank = res.lstBank;
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                    );
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                    Ext.getCmp(prototype.id + '-cmbBank').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstBank, autoLoad: true})
                    );
                    Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });        
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.CODCLIT = Ext.getCmp(prototype.id + '-txtRejCode').getValue();
        me.bean.SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.CODTRAN = Ext.getCmp(prototype.id + '-cmbTrans').getValue( );
        me.bean.TIPREG = Ext.getCmp(prototype.id + '-cmbTReg').getValue( );
        me.bean.NROPOLIZ = Ext.getCmp(prototype.id + '-txtPolicy').getValue( );
                
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2356");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        }
        else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },

    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        
        Ext.create('Ext.Praxis.view.payments.AccountingPlanForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-txtRejCode').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-txtPolicy').setValue('');
    },
    btnExcel_click: function (obj, e) {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {
                
        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                     {msg: 'Under Construction'
                });
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible(option)) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    
    
    /*     
     * Funciones para la paginacion     
     */
    
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }
}
);