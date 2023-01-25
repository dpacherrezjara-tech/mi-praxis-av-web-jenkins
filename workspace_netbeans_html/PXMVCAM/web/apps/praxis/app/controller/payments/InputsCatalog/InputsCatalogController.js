Ext.define('Ext.Praxis.controller.payments.InputsCatalog.InputsCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputsCatalogController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    error: '',
    Fuente: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    lst: [],
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'InputsCatalogForm';
        prototype.url = CONTEXTPATH + '/InputsCatalog';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#InputsCatalogForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InputsCatalogForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InputsCatalogForm-btnClear': {
                click: this.btnClear_click
            },
            '#InputsCatalogForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InputsCatalogForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InputsCatalogForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#InputsCatalogForm-btnBack': {
                click: this.btnBack_click
            },
            '#InputsCatalogForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InputsCatalogForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InputsCatalogForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InputsCatalogForm-btn-pag-last': {
                click: this.pagLast
            },
            '#InputsCatalogForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#InputsCatalogForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#InputsCatalogForm-cmbYear': {
                afterrender: this.afterRenderYear
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    filterINPName: function (e, eOpts) {
        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    obtainData: function () {

//        var storeComboDataYear = win.getStoreYear(false);
//        var storeComboDataMonth = win.getStoreMonth(true);
//        var storeComboDataDay = win.getStoreDays(true);
//
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
//
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
//
//        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
//
//        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbSTATUS = Ext.getCmp(prototype.id + '-cmbSTATUS');
        cmbSTATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["A", "A - ACTIVE"],
                ["I", "I - INACTIVE"]
            ]
        }));
        cmbSTATUS.setValue("");
        
        var cmbFASE = Ext.getCmp(prototype.id + '-cmbFASE');
        cmbFASE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "0 - FASE 0"],
                ["1", "1 - FASE I"],
                ["2", "2 - FASE II"],
                ["3", "3 - FASE III"],
                ["4", "4 - FASE VI"]
            ]
        }));
        cmbFASE.setValue("");
        
        var cmbINPTYPE = Ext.getCmp(prototype.id + '-cmbINPTYPE');
        cmbINPTYPE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["D", "D - DATA"],
                ["C", "C - CONTROL"],
                ["M", "M - MISCELLANEOUS"]
            ]
        }));
        cmbINPTYPE.setValue("");
        
        var cmbINPEXTE = Ext.getCmp(prototype.id + '-cmbINPEXTE');
        cmbINPEXTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                [".txt", ".TXT"],
                [".TXT", ".TXT"],
                [".DAT", ".DAT"],
                [".CSV", ".CSV"],
                [".cmp", ".CMP"]
            ]
        }));
        cmbINPEXTE.setValue("");

    },
    setFormatParameter: function () {

        me.bean = {};

//        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
//                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
//                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
//
//        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
//                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
//                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
//
//        me.bean.IN_PAIS = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
//        me.bean.IN_FPROC = Ext.getCmp(prototype.id + '-txtDateField').getValue();
//
        me.bean.STAT = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue();
        me.bean.FASE = Ext.getCmp(prototype.id + '-cmbFASE').getValue();
        me.bean.INPTYPE = Ext.getCmp(prototype.id + '-cmbINPTYPE').getValue();
        me.bean.INPEXTE = Ext.getCmp(prototype.id + '-cmbINPEXTE').getValue();
        me.bean.INPNAME = Ext.getCmp(prototype.id + '-txtINPName').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
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

        Ext.create('Ext.Praxis.view.payments.InputsCatalogForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lst: me.lst
            }
        }).show();
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2358");
        me.panelActual = '-panelGridData';
        console.log(searchParams);
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        }
    },
    
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            //me.setWidthPie();

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
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbVISTA').setValue('D');
        Ext.getCmp(prototype.id + '-cmbFUENTE').setValue('ACCB');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function (obj, e) {

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
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-Filters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },

    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
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
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    }
}
);