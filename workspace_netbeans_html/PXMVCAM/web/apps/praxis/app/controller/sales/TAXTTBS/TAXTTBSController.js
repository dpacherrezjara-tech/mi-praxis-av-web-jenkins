/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.TAXTTBS.TAXTTBSController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TAXTTBSController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION TAX TTBS  - CONTROLLER TAX TTBS - INIT');
        prototype.id = 'TAXTTBSForm';
        prototype.url = CONTEXTPATH + '/TAXTTBS';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TAXTTBSForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#TAXTTBSForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TAXTTBSForm-btnClear': {
                click: this.btnClear_click
            },
            '#TAXTTBSForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TAXTTBSForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#TAXTTBSForm-btnBack': {
                click: this.btnBack_click
            },
            '#TAXTTBSForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TAXTTBSForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TAXTTBSForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TAXTTBSForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#TAXTTBSForm-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#TAXTTBSForm-txtSearch': {
                keyup: this.eventKey,
                change: this.onUpperValue

            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue(1);
        Ext.getCmp(prototype.id + '-txtSearch');
        this.btnSearch_click();
    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-txtSearch').setFieldLabel("Tax Code");

                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtSearch').setFieldLabel("Country Code");

                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {



        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Tax Code"],
                ["2", "Country Code"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_TFILTER = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var option = Ext.getCmp(prototype.id + '-txtSearch').getValue();

        var IN_A1202PAITA = "";
        var IN_A1202CODTA = "";

        if (IN_TFILTER === '1') {
            IN_A1202PAITA = option;
        } else {
            IN_A1202CODTA = option;
        }

        searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_A1202PAITA: IN_A1202PAITA,
            IN_A1202CODTA: IN_A1202CODTA
        };
        console.log("IN_TFILTER : " + IN_TFILTER);
        console.log("IN_A1202PAITA : " + IN_A1202PAITA);
        console.log("IN_A1202CODTA : " + IN_A1202CODTA);

    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.TAXRATD.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {

        Ext.getCmp(prototype.id + '-txtSearch').setValue('');

    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {
        this.setParams();

        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + searchParams.IN_TFILTER + '&IN_A1202PAITA=' + searchParams.IN_A1202PAITA + '&IN_A1202CODTA=' + searchParams.IN_A1202CODTA);
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /**
     * Metodos usados para el CRUD
     * */

    getDataEntryTAXTTBS: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        console.log(data);
        Ext.create('Ext.Praxis.view.sales.TAXTTBSForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                data: data
            }
        }).show();

    },
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.Resolution024Form.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    }
});
