/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.AverageFareEMD.AverageFareEMDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AverageFareEMDController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    flightNumber: '',
    searchParams: {},
    beanTMP: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        console.log('1)  APPLICATION AVERAGE FARE EMD - CONTROLLER AVERAGE FARE EMD - INIT');
        prototype.id = 'AverageFareEMDForm';       
        prototype.url = CONTEXTPATH + '/AverageFareEMD';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AverageFareEMDForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AverageFareEMDForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AverageFareEMDForm-btnClear': {
                click: this.btnClear_click
            },
            '#AverageFareEMDForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AverageFareEMDForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AverageFareEMDForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AverageFareEMDForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AverageFareEMDForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AverageFareEMDForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AverageFareEMDForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AverageFareEMDForm-cmbSearchBy': {
                select: this.selectComboSeachBy
            },
            '#AverageFareEMDForm-textCode': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AverageFareEMDForm-textRfic': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        this.btnSearch_click();

    },
    // ---------- Eventos de consistencia de los combos---------------   

    selectComboSeachBy: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-textCode').show();
                Ext.getCmp(prototype.id + '-textRfic').hide();
                Ext.getCmp(prototype.id + '-textRfic').setValue('');
                break;
            case '2':
                Ext.getCmp(prototype.id + '-textCode').hide();
                Ext.getCmp(prototype.id + '-textRfic').show();
                Ext.getCmp(prototype.id + '-textCode').setValue('');
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    setStoreData: function() {
        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchBy');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "SubCode"],
                ["2", "RFIC"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setParams();
        this.setGridData(obj, e);
    },
    setParams: function() {
        var code = Ext.getCmp(prototype.id + '-textCode').getValue();
        var rfic = Ext.getCmp(prototype.id + '-textRfic').getValue();
        searchParams = {
            code: code,
            rfic: rfic
        };
        console.log("Code : " + searchParams.code);
        console.log("rfic : " + searchParams.rfic);
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AverageFareEMD.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
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
        Ext.getCmp(prototype.id + '-textCode').setValue('');
        Ext.getCmp(prototype.id + '-textRfic').setValue('');

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
        global.getFile(prototype.url + '/getXLSX?code=' + searchParams.code + '&rfic=' + searchParams.rfic);
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
    btnAdd_click: function(obj, e) {
        global.Msg({
            msg: 'Option not available.'
        });

        //this.winDataEntry('I');
    },
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.AverageFareEMDForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
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
    }
});
